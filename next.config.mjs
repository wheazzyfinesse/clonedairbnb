/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        KINDE_SITE_URL: process.env.KINDE_SITE_URL ?? `https://${process.env.VERCEL_URL}`,
        KINDE_POST_LOGOUT_REDIRECT_URL:
            process.env.KINDE_POST_LOGOUT_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}`,
        KINDE_POST_LOGIN_REDIRECT_URL:
            process.env.KINDE_POST_LOGIN_REDIRECT_URL ?? `https://${process.env.VERCEL_URL}/dashboard`
    },
    images: {
        remotePatterns: [{
            hostname: "a0.muscache.com",
            protocol: "https",
            port: ""
        },
        {
            hostname: "igmtkcfparrontuwpwwu.supabase.co"
        }]
    }
};

export default nextConfig;

