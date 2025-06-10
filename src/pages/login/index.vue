<template>
    <div class="gradient">
        <div
            class="login-paw flex min-h-[100vh] h-full w-full flex-col items-center justify-center gap-14"
        >
            <Brand />
            <form
                class="flex flex-col items-center justify-center gap-6"
                @submit.prevent="handleLogin"
            >
                <TextInput v-model="loginForm.email" placeholder="Email" type="text" />

                <TextInput v-model="loginForm.password" placeholder="Senha" type="password" />

                <div class="flex gap-12">
                    <a class="text-white underline" href="/login">Esqueceu a senha?</a>
                </div>

                <PrimaryButton class="max-w-[260px]" type="submit">Login</PrimaryButton>

                <p class="text-white">
                    Ainda não possui uma conta?
                    <NuxtLink class="text-primary-orange underline" to="/register">
                        Criar conta
                    </NuxtLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import type { AuthLoginFormType } from '~/types/auth';

definePageMeta({
    layout: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const loginForm = reactive<AuthLoginFormType>({
    email: '',
    password: '',
});
const error = ref<string | null>(null);

async function handleLogin() {
    error.value = null;
    if (!loginForm.email || !loginForm.password) {
        error.value = 'Por favor, preencha email e senha.';
        return;
    }
    try {
        await authStore.login(loginForm);
        const redirectPath = (route.query.redirect as string) || '/game';
        router.push(redirectPath);
    } catch (e: any) {
        error.value = e.message || 'Ocorreu um erro durante o login.';
        console.error('Login page error:', e);
    }
}

if (import.meta.client && authStore.isAuthenticated) {
    router.replace('/game');
}
</script>

<style scoped></style>
