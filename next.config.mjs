import MillionLint from "@million/lint";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com",
                protocol: 'https'
            }
        ]
    }
};

export default MillionLint.next({ rsc: true })(nextConfig);
