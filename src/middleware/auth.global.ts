import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (import.meta.server && !process.env.NITRO_PRERENDER_ENABLED) {
        return;
    }
    const router = useRouter();
    const authStore = useAuthStore();

    if (import.meta.client && !authStore.token) {
        authStore.initializeAuth();
    }

    if (import.meta.client) {
        await new Promise(resolve => setTimeout(resolve, 0));
    }

    const protectedRoutes = ['/game'];
    const guestRoutes = ['/login', '/register'];

    if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
        if (import.meta.client) {
            console.log(
                'Auth middleware: Not authenticated, redirecting to login from',
                to.fullPath
            );
            return router.push('/login');
        }
    }

    if (guestRoutes.includes(to.path) && authStore.isAuthenticated) {
        if (import.meta.client) {
            console.log('Auth middleware: Authenticated, redirecting from guest route to /game');
            return router.push('/game');
        }
    }
});
