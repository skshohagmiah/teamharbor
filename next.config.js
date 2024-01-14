/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"plus.unsplash.com"
            },
            {
                hostname:"images.unsplash.com"
            },
            {
                hostname:"lh3.googleusercontent.com"
            },
            {
                hostname:"avatars.githubusercontent.com"
            }
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
