/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'm35gwivdlowrdnhv.public.blob.vercel-storage.com',
                port: '',
            }
        ]
    }
};

export default nextConfig;
