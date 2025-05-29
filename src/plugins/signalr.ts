import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default defineNuxtPlugin(async nuxtApp => {
    const config = useRuntimeConfig();
    if (import.meta.server) return;

    const connection = new HubConnectionBuilder()
        .withUrl(config.public.apiBaseUrl + '/jogohub')
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    try {
        await connection.start();
        console.log('Conexão SignalR iniciada com sucesso!');
    } catch (e) {
        console.error('Erro ao iniciar SignalR:', e);
    }

    nuxtApp.provide('signalRConnection', connection);
});
