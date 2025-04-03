<template>
    <div class="gradient">
        <div
            class="login-paw flex h-[100vh] w-full flex-col items-center justify-center gap-14"
        >
            <Brand />
            <form
                class="flex flex-col items-center justify-center gap-6"
                @submit="e => onSubmit(e)"
            >
                <TextInput
                    v-model="authForm.name"
                    placeholder="Nome"
                    type="text"
                />

                <TextInput
                    v-model="authForm.email"
                    placeholder="Email"
                    type="text"
                />

                <TextInput
                    v-model="authForm.password"
                    placeholder="Senha"
                    type="password"
                />

                <div class="flex gap-12">
                    <PrimaryCheckbox
                        v-model="remember"
                        label="Lembrar de mim"
                    />
                    <a class="text-white underline" href="/login">
                        Esqueceu a senha?
                    </a>
                </div>

                <PrimaryButton class="max-w-[260px]" type="submit">
                    Login
                </PrimaryButton>

                <p class="text-white">
                    Ainda não possui uma conta?
                    <a class="text-primary-orange underline" href="/login">
                        Criar conta
                    </a>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { AuthRegisterFormType } from '~/types/auth';

async function onSubmit(e: Event) {
    e.preventDefault();
    const { data, error, status } = useFetch(
        'http://localhost:5087/api/auth/register',
        {
            method: 'POST',
            body: JSON.stringify({ ...authForm }),
            headers: {
                accept: 'application/json',
            },
        },
    );
    console.log(data);
    console.log(error);
    console.log(status);
    // await navigateTo('/dashboard');
}

const remember = ref<boolean>(true);
const authForm = reactive<AuthRegisterFormType>({
    name: '',
    email: '',
    password: '',
});
</script>

<style scoped></style>
