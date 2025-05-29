<template>
    <div class="gradient">
        <div class="login-paw flex h-[100vh] w-full flex-col items-center justify-center gap-14">
            <Brand />
            <form
                class="flex flex-col items-center justify-center gap-6"
                @submit="e => onSubmit(e)"
            >
                <TextInput v-model="authForm.email" placeholder="Email" type="text" />

                <TextInput v-model="authForm.password" placeholder="Senha" type="password" />

                <div class="flex gap-12">
                    <PrimaryCheckbox v-model="remember" label="Lembrar de mim" />
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
import { useApi } from '~/composables/api';
import type { AuthLoginFormType } from '~/types/auth';

async function onSubmit(e: Event) {
    e.preventDefault();

    const { data, error, status } = await useApi<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ ...authForm }),
        headers: {
            accept: 'application/json',
        },
    });

    if (error.value?.statusCode === 401) return console.log(error);
    if (status.value != 'success') return console.log(error);
    if (!data.value?.token) return console.log(error);

    const token = useCookie<string>('token', { maxAge: 60 * 15, path: '/' });
    token.value = data.value.token;
    return navigateTo('/dashboard');
}

const remember = ref<boolean>(true);
const authForm = reactive<AuthLoginFormType>({
    email: '',
    password: '',
});
</script>

<style scoped></style>
