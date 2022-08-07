import Image from 'next/image'
import netflixlogo from '../public/Logonetflix.png'

const Loader = () => {
    return ( 
        <div className='container-fluid' id='main_container'>
            <div className="row h-100">
                <div className="col-12 d-flex justify-content-between align-items-center px-5" id='navegator'>
                    <span id='logo_wrapper'>
                        <Image src={netflixlogo} alt='Netflix logo'/>
                    </span>
                    <div className="circular_loader skeleton"></div>
                </div>

                <div className="col-12 d-flex justify-content-center align-items-center" id='main_section'>
                    <div>
                        <h1 className="skeleton" style={{borderRadius: '5px'}}><span className="invisible">Loading...</span></h1>
                        <div className="text_loader skeleton"></div>
                        <div className="reactangle_loader skeleton mt-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Loader;