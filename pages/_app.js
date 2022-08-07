
import { useEffect } from "react";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    // Due to next.js being a Server-Side Rendering Bootstrap js has to be imported this way
    useEffect(() => {
        typeof document !== undefined ? import("bootstrap/dist/js/bootstrap") : null
    }, [router.events]);
    return <Component {...pageProps} />
}

export default MyApp;
