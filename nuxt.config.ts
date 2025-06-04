import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    srcDir: 'src/',
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        public: {
            apiBaseUrl: process.env.NUXT_API_BASE_URL,
        },
    },
    app: {
        head: {
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap',
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Russo+One&display=swap',
                },
            ],
        },
    },
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ['5d08-2804-56c-a5f3-b000-9c89-d8dc-e58e-6b8c.ngrok-free.app'],
        },
    },
    components: [
        {
            path: '~/components/shared',
            pathPrefix: false,
        },
        {
            path: '~/components/icons',
            pathPrefix: false,
        },
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
});
