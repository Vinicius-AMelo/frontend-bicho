import { defineStore } from 'pinia';

export const AuthStore = defineStore('auth', {
    state: (): AuthState => ({
        email: '',
        password: '',
    }),
    actions: {},
});

type AuthState = {
    email: string;
    password: string;
};
