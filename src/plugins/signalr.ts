import type { HubConnection } from '@microsoft/signalr';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

declare module '#app' {
    interface NuxtApp {
        $signalRConnection: HubConnection;
    }
}

export default defineNuxtPlugin(nuxtApp => {
    const connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5087/jogohub')
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

    connection
        .start()
        .catch(err => console.error('Erro ao conectar ao SignalR:', err));

    nuxtApp.provide('signalRConnection', connection);
});
