import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { useApi } from '~/composables/api';
import type {
    AuthLoginFormType,
    AuthRegisterFormType,
    AuthResponse,
    DecodedJwtPayload,
    User,
} from '~/types/auth';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as User | null,
        loading: false,
    }),
    getters: {
        isAuthenticated: state => !!state.token && !!state.user,
        userId: state => state.user?.id,
        userEmail: state => state.user?.email,
        userRole: state => state.user?.role,
        userBalance: state => state.user?.balance,
        // userName getter removido pois 'name' não vem do token
    },
    actions: {
        setToken(newToken: string | null) {
            this.token = newToken;
            if (import.meta.client) {
                if (newToken) {
                    localStorage.setItem('authToken', newToken);
                } else {
                    localStorage.removeItem('authToken');
                }
            }
        },

        setUserFromToken(token: string | null) {
            if (!token) {
                this.user = null;
                return;
            }
            try {
                const decodedPayload = jwtDecode<DecodedJwtPayload>(token);
                console.log(decodedPayload);
                this.user = {
                    id: decodedPayload.id,
                    email: decodedPayload.email,
                    role: decodedPayload.role,
                    balance: decodedPayload.balance,
                };
            } catch (error) {
                console.error('Falha ao decodificar o token ou mapear dados do usuário:', error);
                this.setToken(null);
                this.user = null;
            }
        },

        async login(credentials: AuthLoginFormType): Promise<boolean> {
            this.loading = true;
            try {
                const { data, error, status } = await useApi<AuthResponse>('/auth/login', {
                    method: 'POST',
                    body: credentials,
                });

                if (error.value || !data.value?.token) {
                    const errorMessage =
                        error.value?.data?.message ||
                        `Falha no login (status: ${status.value || 'desconhecido'}). Verifique suas credenciais.`;
                    console.error('Login failed:', error.value || 'No token received');
                    this.setToken(null);
                    this.user = null;
                    throw new Error(errorMessage);
                }

                this.setToken(data.value.token);
                this.setUserFromToken(data.value.token);

                if (!this.user) {
                    throw new Error(
                        'Login bem-sucedido, mas falha ao processar dados do usuário a partir do token.'
                    );
                }

                return true;
            } catch (err: any) {
                console.error('Login action error:', err);
                this.setToken(null);
                this.user = null;
                if (err instanceof Error) {
                    throw err;
                }
                throw new Error('Ocorreu um erro desconhecido durante o login.');
            } finally {
                this.loading = false;
            }
        },

        async register(details: AuthRegisterFormType): Promise<boolean> {
            this.loading = true;
            try {
                const { error, status } = await useApi<unknown>('/auth/register', {
                    method: 'POST',
                    body: details,
                });

                if (error.value) {
                    const errorMessage =
                        error.value?.data?.message ||
                        `Falha no registro (status: ${status.value || 'desconhecido'}).`;
                    console.error('Registration failed:', error.value);
                    throw new Error(errorMessage);
                }
                return true;
            } catch (err: any) {
                console.error('Register action error:', err);
                if (err instanceof Error) {
                    throw err;
                }
                throw new Error('Ocorreu um erro desconhecido durante o registro.');
            } finally {
                this.loading = false;
            }
        },

        logout() {
            this.setToken(null);
            this.user = null;
            if (import.meta.client) {
                navigateTo('/login', { replace: true });
            }
        },

        initializeAuth() {
            if (import.meta.client) {
                const token = localStorage.getItem('authToken');
                if (token) {
                    if (!this.token) {
                        this.setToken(token);
                        this.setUserFromToken(token);
                    } else if (this.token && !this.user) {
                        this.setUserFromToken(this.token);
                    }
                } else {
                    this.setToken(null);
                    this.user = null;
                }
            }
        },
    },
});
