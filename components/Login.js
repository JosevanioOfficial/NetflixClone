import { useRef } from 'react';
import Image from 'next/image';
import { getAuth, signInAnonymously } from "firebase/auth";
import netflixlogo from '../public/Logonetflix.png';
import styles from '../styles/Login.module.css';

export default function Login() {
    const usernameInput = useRef();
    const failureAlert = useRef();
    const failureMsg = useRef();
    const actionLoader = useRef();
    const getStatedBtn = useRef();

    function login(){    
        if(usernameInput.current.value === ''){
            usernameInput.current.nextElementSibling.textContent = 'Campo Vazio';
            setTimeout(() => {
                usernameInput.current.nextElementSibling.textContent = '';
            }, 3000);
        }
        else if( !usernameInput.current.value.trim().match(/^[A-Za-z0-9 áàãâéêíóòõôúçÁÀÃÂÉÊÍÓÒÔÕÚÇ-]+$/) ){
            usernameInput.current.nextElementSibling.textContent = 'Insira apenas letras do alfabeto ou números';
            setTimeout(() => {
                usernameInput.current.nextElementSibling.textContent = '';
            }, 3000);
        }
        else{
            const auth = getAuth();
            actionLoader.current.classList.remove('d-none');

            signInAnonymously(auth).then(() => {
                actionLoader.current.classList.add('d-none');
            })
            .catch(error => {
                console.log(error);
                failureAlert.current.classList.replace('d-none', 'd-flex');
                failureMsg.current.textContent = 'Error: Check your internet connection & try again...';
                setTimeout(() => failureAlert.current.classList.replace('d-flex', 'd-none'), 5000);
            });
        }
    }

    // Focus on the username input and the Get Stared button to tell users to use them instead of th Signin button at the top
    function focusOnInput(){
        usernameInput.current.focus();
        getStatedBtn.current.classList.add('animate__animated', 'animate__shakeX');
    }

    return (
        <div className={`container-fluid ${styles.sign_backg}`} id='main_container'>
            <div className="row h-100">

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
                <nav className="col-12 d-flex justify-content-between px-5 align-items-center" id='navegator'>
                    <span id='logo_wrapper'>
                        <Image src={netflixlogo} alt='Netflix logo'/>
                    </span>

                    <button onClick={focusOnInput} className='btn' id={styles.signin_small_btn}>Sign In</button>
                </nav>

                {/* Main section where you can enter username to sign in */}
                <section className="col-12 d-flex flex-column justify-content-center align-items-center text-center" id='main_section'>
                    <h1 className='fw-bold display-3'>Unlimited movies, TV shows, and more.</h1>
                    <h3 className='my-3'>Watch anywhere. Cancel anytime.</h3>
                    <p className='mx-3'>Ready to watch? Enter your email to create or restart your membership.</p>

                    <div className={`d-flex flex-column flex-md-row ${styles.middle_signin_wrapper}`}>
                        <input ref={usernameInput} className='px-2' placeholder='Username' type="text" name="" id={styles.signininput} />
                        <small className='error_msg'></small>

                        <button ref={getStatedBtn} onClick={login} className='d-inline d-md-block fw-bold mt-3 mt-md-0 mx-auto mx-0 px-3 px-md-4 py-2' id={styles.signin_big_btn}>Get Started <i className="bi bi-chevron-right"></i></button>
                    </div>
                </section>
            </div>
        </div>      
    )
}
