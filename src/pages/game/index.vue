<template>
    <div>
        <h2>Sorteio ao vivo</h2>

        <div>
            <p>Sorteio atual: {{ sorteio.join(', ') || 'Aguardando...' }}</p>
        </div>

        <AnimatedCards :numbers="sorteio" />

        <div>
            <button @click="enviarAposta">Enviar Aposta</button>
            <p>{{ mensagem }}</p>
        </div>

        <BetSelector :select-bet="selectBet" />
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from '@microsoft/signalr';

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>('');

let connection: HubConnection | null = null;

const enviarAposta = async () => {
    console.log(aposta.value);
    if (connection && connection.state === 'Connected') {
        await connection.invoke('CreateBet', aposta.value);
        mensagem.value = 'Aposta enviada!';
    } else {
        mensagem.value = 'Erro ao conectar ao servidor.';
    }
};

function selectBet(bet: number[] | null) {
    aposta.value = bet;
}

onMounted(() => {
    connection = useNuxtApp().$signalRConnection as HubConnection;

    connection.on('Sorteio', (numeros: number[]) => {
        sorteio.value = numeros;
    });

    connection.on('Vencedor', (numeros: number[]) => {
        mensagem.value = `🎉 Você ganhou! Números: ${numeros.join(', ')}`;
    });

    connection.on('ApostaConfirmada', (numeros: number[]) => {
        console.log(numeros);
    });
});
</script>

<style scoped></style>
