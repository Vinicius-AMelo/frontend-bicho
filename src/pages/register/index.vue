<template>
    <div class="gradient">
        <div class="login-paw flex h-[100vh] w-full flex-col items-center justify-center gap-14">
            <Brand />
            <form
                class="flex flex-col items-center justify-center gap-6"
                @submit.prevent="handleRegister"
            >
                <TextInput v-model="registerForm.name" placeholder="Nome" type="text" />

                <TextInput v-model="registerForm.email" placeholder="Email" type="text" />

                <TextInput v-model="registerForm.password" placeholder="Senha" type="password" />

                <div class="flex gap-12">
                    <a class="text-white underline" href="/login">Esqueceu a senha?</a>
                </div>

                <PrimaryButton class="max-w-[260px]" type="submit">Registrar</PrimaryButton>

                <p class="text-white">
                    Já possui uma conta?
                    <NuxtLink class="text-primary-orange underline" to="/login">
                        Fazer login
                    </NuxtLink>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/stores/auth';
import type { AuthRegisterFormType } from '~/types/auth';

definePageMeta({
    layout: 'auth',
});

const authStore = useAuthStore();
const router = useRouter();

const registerForm = reactive<AuthRegisterFormType>({
    name: '',
    email: '',
    password: '',
});
const error = ref<string | null>(null);

async function handleRegister() {
    error.value = null;

    if (!registerForm.name || !registerForm.email || !registerForm.password) {
        error.value = 'Por favor, preencha todos os campos.';
        return;
    }
    try {
        await authStore.register(registerForm);
        router.push('/game');
    } catch (e: any) {
        error.value = e.message || 'Ocorreu um erro durante o registro.';
        console.error('Register page error:', e);
    }
}

if (import.meta.client && authStore.isAuthenticated) {
    router.replace('/game');
}
</script>

<style scoped></style>
