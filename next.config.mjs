/** @type {import('next').NextConfig} */
const nextConfig = {
  // images: {
  //   domains: ["res.cloudinary.com"],
  // },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        //  domains: ["res.cloudinary.com"],
      },
    ],
    // or, in older Next.js versions:
    // domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
