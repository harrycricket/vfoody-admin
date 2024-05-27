/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '', // provide host name here
        port: '',
        pathname: '/**', // detailed path can be specified here for more security
      },
    ],
  },
};

export default nextConfig;
