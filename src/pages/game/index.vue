<template>
    <div class="gradient flex flex-col justify-center items-center gap-6 h-screen relative">
        <!-- Wallet/Deposit Element (already added at top-right) -->
        <div class="absolute top-4 right-4 z-50">
            <div
                class="flex items-center rounded-[8px] header-currency-bg cursor-pointer relative"
                data-v-a084aa25=""
            >
                <!-- Saldo -->
                <div
                    class="flex items-center text-[14px] h-[40px] font-bold text-e-home-color-103 mx-[6px]"
                    data-v-a084aa25=""
                >
                    <img
                        alt=""
                        class="shrink-0 w-[24px] h-[24px]"
                        data-v-80ddda12=""
                        data-v-a084aa25=""
                        src="https://web-res-ccc.afunimg8.com/cdn-cgi/image/format=auto/dev_skin/C02/wallet/currency/BRL.png"
                    />
                    <div class="mx-[4px] text-e-home-color-114" data-v-a084aa25="">
                        <span class="whitespace-pre" data-v-a084aa25="">0,00</span>
                        <div class="text-[12px] text-e-home-color-104" data-v-a084aa25=""></div>
                    </div>
                </div>

                <NuxtLink
                    class="flex items-center gap-x-[4px] px-[10px] header-deposit-btn h-[34px] mr-[3px] ml-[3px] relative
                        font-bold rounded-[6px] hover:brightness-105"
                    to="/Deposit"
                >
                    <i
                        class="inline-block h-[max-content] w-[max-content] icon sysicon-n-withdraw-e cursor-pointer text-[18px]"
                        data-v-a084aa25=""
                    ></i>
                    <span class="text-[14px] font-bold" data-v-a084aa25="">Depósito</span>
                </NuxtLink>
            </div>
        </div>

        <div class="flex flex-col items-center">
            <h2 class="text-center text-white text-2xl mb-4">Sorteio ao vivo</h2>
            <AnimatedCards :numbers="sorteio" />
        </div>

        <div class="w-full max-w-md mb-2">
            <FuseTimer
                ref="fuseTimerRef"
                :active="timerActive"
                :duration="timerDuration"
                @time-up="handleTimeUp"
            />
        </div>

        <div class="flex flex-col items-center w-full max-w-md">
            <button
                class="bg-primary-orange hover:bg-primary-orange-hover text-white font-bold text-xl p-3 rounded-lg w-full
                    max-w-[260px] mb-4"
                @click="enviarAposta"
            >
                Enviar Aposta
            </button>
            <p class="text-white mb-4">{{ mensagem }}</p>
            <BetSelector :select-bet="selectBet" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from '@microsoft/signalr';

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>('');

const timerDuration = ref(60);
const timerActive = ref(true);
const fuseTimerRef = ref(null);

let connection: HubConnection | null = null;

const enviarAposta = async () => {
    console.log(aposta.value);
    if (connection && connection.state === 'Connected') {
        try {
            await connection.invoke('CreateBet', aposta.value, 1);
            mensagem.value = 'Aposta enviada!';

            if (fuseTimerRef.value) {
                fuseTimerRef.value.resetTimer();
                fuseTimerRef.value.startTimer();
            }
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

function handleTimeUp() {
    mensagem.value = 'Tempo esgotado! Faça uma nova aposta.';
}

onMounted(() => {
    connection = useNuxtApp().$signalRConnection as HubConnection;

    connection.on('Sorteio', (numeros: number[]) => {
        sorteio.value = numeros;

        if (fuseTimerRef.value) {
            fuseTimerRef.value.resetTimer();
            fuseTimerRef.value.startTimer();
        }
    });

    connection.on('Vencedor', (numeros: number[]) => {
        mensagem.value = `🎉 Você ganhou! Números: ${numeros.join(', ')}`;
    });

    connection.on('ApostaConfirmada', (numeros: number[]) => {
        console.log(numeros);
    });
});
</script>

<style scoped>
.header-currency-bg {
    background-color: #2a2a3e;
    display: flex;
    align-items: center;
    padding: 3px;
}

.text-e-home-color-103 {
    color: #c1c1d1;
}

.text-e-home-color-114 {
    color: #ffffff;
}

.text-e-home-color-104 {
    color: #8a8a9e;
}

.header-deposit-btn {
    background-color: #86efac;
}

.header-deposit-btn .sysicon-n-withdraw-e,
.header-deposit-btn span {
    color: #1f2937 !important;
}

.sysicon-n-withdraw-e::before {
    content: '💰';
    font-family: sans-serif;
}
</style>
