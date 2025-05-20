export function useApi<T>(path: string, options: any = {}) {
    const config = useRuntimeConfig();
    const token = useCookie<string>('token');
    console.log(token.value);
    return useFetch<T>(path, {
        baseURL: config.public.apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token.value}`,
            ...options.headers,
        },
        ...options,
    });
}
