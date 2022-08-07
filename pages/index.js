/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loader from '../components/Loader';
import Login from '../components/Login';
import { firebaseConfig } from '../firebase.config';

// require('dotenv').config();
// import 'dotenv/config'
// import 'dotenv/config.js'

// Initialize Firebase
initializeApp(firebaseConfig);

export default function Home() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => user ? router.push('/user') : setLoading(false));
    }, [])

    return (loading ? <Loader /> : <Login />)
}
