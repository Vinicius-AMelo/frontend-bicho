<template>
    <div class="flex flex-col justify-center items-center gap-6">
        <div>
            <h2 class="text-center">Sorteio ao vivo</h2>

            <div>
                <!--            <p>Sorteio atual: {{ sorteio.join(', ') || 'Aguardando...' }}</p>-->
            </div>

            <AnimatedCards :numbers="sorteio" />
        </div>

        <div>
            <button @click="enviarAposta">Enviar Aposta</button>
            <p>{{ mensagem }}</p>
            <input v-model="betValue" type="number" />

            <BetSelector :select-bet="selectBet" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from '@microsoft/signalr';

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>('');
const betValue = ref<number>(0);

let connection: HubConnection | null = null;

const enviarAposta = async () => {
    console.log(aposta.value);
    if (connection && connection.state === 'Connected') {
        try {
            await connection.invoke('CreateBet', aposta.value, 1, betValue.value);
            mensagem.value = 'Aposta enviada!';
        } catch (e) {
            console.log(e);
        }
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
    connection.invoke('JoinSession', 'zaza');
});
</script>

<style scoped></style>
