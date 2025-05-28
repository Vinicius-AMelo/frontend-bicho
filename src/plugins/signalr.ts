import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export default defineNuxtPlugin(async nuxtApp => {
    // Só executa no client
    if (import.meta.server) return;

    const connection = new HubConnectionBuilder()
        .withUrl('https://5660-2804-56c-a5f3-b000-9c89-d8dc-e58e-6b8c.ngrok-free.app/jogohub')
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
