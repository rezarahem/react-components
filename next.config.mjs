/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rahem.storage.iran.liara.space'
            }
        ]
    },
};

export default nextConfig;
