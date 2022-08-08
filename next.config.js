/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
        images: {
            unoptimized: true,
        },
    },
    env: {
        apiKey: "AIzaSyCCWEJwKSBhBG4ow954GH9MvAxxVdL7MGA",
        authDomain: "netflixwebclone.firebaseapp.com",
        projectId: "netflixwebclone",
        storageBucket: "netflixwebclone.appspot.com",
        messagingSenderId: "446681768246",
        appId: "1:446681768246:web:58c36e8c501a078d475397"
    }    
}

module.exports = nextConfig
