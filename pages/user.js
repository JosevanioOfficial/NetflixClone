/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/Link';
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../firebase.config';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper"; // import required modules
import "swiper/css"; // Import Swiper styles
import 'swiper/css/navigation'; // Import Swiper styles
import netflixlogo from '../public/Logonetflix.png';
import avatar from '../public/avatar.png';
import Loader from '../components/Loader';
import styles from '../styles/User.module.css';


// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();


export default function User({all_content}) {
    const router = useRouter();
    const failureAlert = useRef();
    const failureMsg = useRef();
    const actionLoader = useRef();
    const [data, setData] = useState();

    // Page loading: shows gif when loading the whole page 
    // Data loading: shows gif when loading data that will show up on a specifc part of the page
    const [pageLoading, setPageLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(true);
    
    function logout(){
        actionLoader.current.classList.remove('d-none');

        signOut(auth).then(() => {
            actionLoader.current.classList.add('d-none');
        }).catch(error => {
            console.log(error);
            failureAlert.current.classList.replace('d-none', 'd-flex');
            failureMsg.current.textContent = 'Error: Check your internet connection & try again...';
            setTimeout(() => failureAlert.current.classList.replace('d-flex', 'd-none'), 5000);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(!user){
                router.push('/');
            }
            else if(all_content) {
                const tvshows = all_content.filter(each => each.category === 'Tv Show');
                const movies = all_content.filter(each => each.category === 'Movie');
                const popular = all_content.filter(each => each.list === 'Popular');
                setData({tvshows, movies, popular});
                setPageLoading(false);
                setDataLoading(false);
            }
            else{
                setPageLoading(false);
            }
        });
    }, [])
    
    return (
        pageLoading ? <Loader />
        :
        <div className='container-fluid' id='main_container'>
            <div className={`row h-100 ${styles.page_backg}`}>

                {/* Action loader: shows gif when an event occurs: e.g user clicks on button to logout */}
                <div ref={actionLoader} id="action_loader" className="d-none"></div>

 
                {/* Failure notification: shows icon when an event fails, e.g: user tries to logout */}
                <div ref={failureAlert} className="d-none justify-content-center align-items-center" id="failure_notification">
                    <div className="p-2 d-flex flex-column justify-content-center align-items-center">
                        <i className="bi bi-x-circle-fill animate__animated animate__shakeX"></i>
                        <p ref={failureMsg} className="text-center msg_backg text-white px-2"></p>
                    </div>
                </div>

                {/* Navegator */}
                <nav className={`col-12 d-flex justify-content-between px-5 align-items-center ${styles.header}`} id='navegator'>
                    <div className={`d-flex justify-content-center align-items-center ${styles.left_wrapper}`}>
                        {/* Logo */}
                        <span id='logo_wrapper'>
                            <Image src={netflixlogo} alt='Netflix logo'/>
                        </span>

                        <span className='d-none d-md-flex'>
                            {navegationLinks()}
                        </span>
                    </div>

                    <div className='text-white d-flex justify-content-center align-items-center'>
                        {/* Notification, search icons */}
                        <span className={`d-none d-md-flex justify-content-center align-items-center ${styles.right_nav_icons}`}>
                            <i className="bi bi-search mx-3"></i>
                            <p className='m-0'>KIDS</p>
                            <i className="bi bi-bell-fill mx-3"></i>
                        </span>

                        {/* Profile Dropdown */}
                        <div className={`dropdown ${ typeof window !== "undefined" && window.matchMedia('(min-width: 768px)').matches ? '' : 'dropstart' } `}>
                            {/* Profile avatar */}
                            <span className={`d-flex justify-content-center align-items-center dropdown-toggle ${styles.avatar_profile}`} id="avatarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                <Image src={avatar} width={40} height={40} alt='Netflix logo'/>
                            </span>

                            {/* Dropdown Menu */}
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="avatarDropdown">
                                <div className='d-flex d-xl-none justify-content-center align-items-center p-3'>
                                    <i className="bi bi-search mx-2"></i>
                                    <p className='mx-2 my-0'>KIDS</p>
                                    <i className="bi bi-bell-fill mx-2"></i>
                                </div>

                                {navegationLinks()}
                                <li onClick={logout} className={`dropdown-item ${styles.logout_text}`}>Logout</li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <section className={`col-12 ${styles.middle_section}`} id='main_section'>

                    {/* Featured Movie */}
                    <div className={`pt-5 ps-md-5 ${styles.featured_movie}`}>
                        <h1 className='display-4 display-md-1 fw-bold'>House of Cards</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita reprehenderit eligendi nulla eius excepturi autem quasi, quis nostrum, atque eum at inventore, consequatur suscipit harum ipsum est.</p>

                        <button className='btn btn-light me-3'>
                            <i className='bi bi-play-fill'> Play</i>
                        </button>

                        <button className='btn btn-secondary'>
                            <i className="bi bi-info-circle-fill"> Info</i> 
                        </button>
                    </div>

                    {/* Carousel */}
                    <div className={`pb-4 ${styles.list}`}>
                        {
                            dataLoading ? 
                            <>
                                <div className="reactangle_loader mt-4 mx-auto d-flex align-items-end">
                                    <div className="text_loader skeleton"></div>
                                </div>
                                <div className="reactangle_loader skeleton mt-4 mx-auto"></div>
                                <div className="reactangle_loader skeleton mt-4 mx-auto"></div>
                            </>
                            :
                            <>
                                <p className='mb-1'>Popular on Netflix</p>   
                                {data && <div>{carousel(data.popular)}</div>}
                        
                                <p className='mb-1 mt-2'>Tv Shows</p>
                                {data && <div>{carousel(data.tvshows)}</div>}

                                <p className='mb-1 mt-2'>Movies</p>
                                {data && <div>{carousel(data.movies)}</div>}
                            </>
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

// Gets data from database
export const getStaticProps = async () => {
    const database = getFirestore();
    const contentRef = collection(database, 'content');
    let response;
    try{        
        const snapshot = await getDocs(contentRef);
        const all_content = snapshot.docs.map(each => {return { 'id': each.id, ...each.data() }});
        response = {props: {all_content: all_content}};
    }
    catch(error){
        console.log(error);
        response = {props: {all_content: false}};
    }
    finally{
        return response;
    }
}

function navegationLinks(){
    return (
        <>
            <Link href={'/'}><a className='d-block d-xl-none dropdown-item mb-3'>Home</a></Link>
            <Link href={'/'}><a className='d-block d-xl-none dropdown-item my-3'>TV Shows</a></Link>
            <Link href={'/'}><a className='d-block d-xl-none dropdown-item my-3'>Movies</a></Link>
            <Link href={'/'}><a className='d-block d-xl-none dropdown-item my-3'>Recently Added</a></Link>
            <Link href={'/'}><a className='d-block d-xl-none dropdown-item my-3'>My List</a></Link>
        </>
    )
}

// Displays carousel list of content to the DOM
function carousel(content_array){               
    return (
        <Swiper slidesPerView={ typeof window !== "undefined" && window.matchMedia('(min-width: 768px)').matches ? 6 : 1 } 
        slidesPerGroup={ typeof window !== "undefined" && window.matchMedia('(min-width: 768px)').matches ? 3 : 1 }
        spaceBetween={2} 
        modules={[Navigation]} 
        navigation
        >
            {content_array.map(each => (<SwiperSlide key={`${each.id}${each.name}`}><Image src={each.image} width={360} height={200} alt={`${each.name} cover`}/></SwiperSlide>))}
        </Swiper>
    )
}
