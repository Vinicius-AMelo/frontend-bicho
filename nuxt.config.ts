import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    srcDir: 'src/',
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],
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
    },
    components: [
        {
            path: '~/components/shared',
            pathPrefix: false,
        },
    ],
});
