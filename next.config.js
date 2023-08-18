/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'images.unsplash.com' },
            { hostname: 'lh3.googleusercontent.com' },
            { hostname: 'm.media-amazon.com' },
        ],
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = nextConfig;
