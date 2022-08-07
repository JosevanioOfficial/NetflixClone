
import Image from 'next/image'
import Link from 'next/link'

const main_container = {
    height: '100vh',
    width: '100vw'
}

const header = {
    height: '10%'
}

const main_section = {
    height: '90%',
    color: 'white'
}

const link_style = {
    color: '#e50914'
}

const NotFound = () => {
    return ( 
        <div className="container-fluid" style={main_container}>
            <div className="row h-100">
                <nav className="col-12 d-flex justify-content-center align-items-center" style={header}>
                    <Image src='/Logonetflix.png' width={150} height={50} alt='Netflix logo'/>
                </nav>

                <section className='col-12 text-center d-flex flex-column justify-content-center align-items-center' style={main_section}>
                    <h1 className='display-1 fw-bold'>404 Error</h1>
                    <h4 className='my-2'>Page not found!</h4>
                    <h6 className='fw-normal'>The page you are looking for does not exist, please go back to the <Link href={'/'}><a style={link_style}>Home</a></Link> page.</h6>
                </section>


            </div>
        </div>
    );
}
 
export default NotFound;