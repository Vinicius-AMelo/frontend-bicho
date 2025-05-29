<template>
    <div class="gradient h-[100vh]">
        <div class="login-paw flex flex-col justify-center items-center gap-6 w-full h-full">
            <Brand />
            <BetDisplay
                :disabled="disabled"
                :mensagem="mensagem"
                :sorteio="sorteio"
                :submit="enviarAposta"
            />

            <div class="bg-gray-700 p-8 rounded-sm">
                <BetSelector :select-bet="selectBet" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from '@microsoft/signalr';

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>('Selecione um animal:');
const disabled = ref<boolean>(false);

let connection: HubConnection | null = null;

async function enviarAposta(betValue: number) {
    if (!aposta.value) {
        mensagem.value = 'Por favor, selecione uma aposta.';
        return;
    }

    if (connection && connection.state === 'Connected') {
        try {
            await connection.invoke('CreateBet', aposta.value, 1, betValue);
        } catch (e) {
            console.log(e);
        }
    } else {
        mensagem.value = 'Erro ao conectar ao servidor.';
    }
}

function selectBet(bet: number[] | null) {
    console.log(bet);
    aposta.value = bet;
}

onMounted(() => {
    connection = useNuxtApp().$signalRConnection as HubConnection;

    connection.on('Sorteio', (numeros: number[]) => {
        disabled.value = false;
        sorteio.value = numeros;
    });

    connection.on('Vencedor', (numeros: number[]) => {
        mensagem.value = `🎉 Você ganhou! Números: ${numeros.join(', ')}`;
    });

    connection.on('ApostaConfirmada', (numeros: number[]) => {
        mensagem.value = `Aposta confirmada! Números: ${numeros.join(', ')}`;
        disabled.value = true;
    });

    connection.invoke('JoinSession', 'zaza');
});
</script>

<style scoped></style>
