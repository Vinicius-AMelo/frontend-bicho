import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin(async nuxtApp => {
    const authStore = useAuthStore();

    if (!authStore.token) {
        authStore.initializeAuth();
    }
});
