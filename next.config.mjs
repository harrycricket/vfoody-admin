/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v-foody.s3.ap-southeast-1.amazonaws.com', // provide host name here
        port: '',
        pathname: '/image/**', // detailed path can be specified here for more security
      },
    ],
  },
};

export default nextConfig;
