/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'uploads.wikimedia.org',
                port: '',
                pathname: '/wikipedia/en/b/b9/Solana_logo.png'
            },
            {
                protocol: 'https',
                hostname: 'ui-avatars.com',
                port: '',
            }
        ]
    }
};

export default nextConfig;
