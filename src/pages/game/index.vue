<template>
    <div class="gradient flex flex-col justify-center items-center gap-6 h-screen relative">
        <!-- Wallet/Deposit Element (already added at top-right) -->
        <div class="absolute top-4 right-4 z-50">
            <div data-v-a084aa25="" class="flex items-center rounded-[8px] header-currency-bg cursor-pointer relative">
                <!-- Saldo -->
                <div data-v-a084aa25="" class="flex items-center text-[14px] h-[40px] font-bold text-e-home-color-103 mx-[6px]">
                    <img data-v-80ddda12="" data-v-a084aa25="" src="https://web-res-ccc.afunimg8.com/cdn-cgi/image/format=auto/dev_skin/C02/wallet/currency/BRL.png" alt="" importance="auto" class="w-[20px] h-[20px] shrink-0 w-[24px] h-[24px]" lazy="">
                    <div data-v-a084aa25="" class="mx-[4px] text-e-home-color-114">
                        <span data-v-a084aa25="" class="whitespace-pre">0,00</span>
                        <div data-v-a084aa25="" class="text-[12px] text-e-home-color-104">
                        </div>
                    </div>
                    <!---->
                </div>
                <!-- Botão Depósito -->
                <NuxtLink to="/Deposit" class="flex items-center gap-x-[4px] px-[10px] header-deposit-btn h-[34px] mr-[3px] ml-[3px] relative font-bold rounded-[6px] hover:brightness-105">
                    <i data-v-a084aa25="" class="inline-block h-[max-content] w-[max-content] icon sysicon-n-withdraw-e cursor-pointer text-[18px]"></i>
                    <span data-v-a084aa25="" class="text-[14px] font-bold">Depósito</span>
                </NuxtLink>
            </div>
        </div>

        <!-- Original content -->
        <div class="flex flex-col items-center">
            <h2 class="text-center text-white text-2xl mb-4">Sorteio ao vivo</h2>
            <AnimatedCards :numbers="sorteio" />
        </div>

        <!-- Fuse Timer -->
        <div class="w-full max-w-md mb-2">
            <FuseTimer 
                :duration="timerDuration" 
                :active="timerActive" 
                @timeUp="handleTimeUp" 
                ref="fuseTimerRef"
            />
        </div>

        <div class="flex flex-col items-center w-full max-w-md">
            <button
                @click="enviarAposta"
                class="bg-primary-orange hover:bg-primary-orange-hover text-white font-bold text-xl p-3 rounded-lg w-full max-w-[260px] mb-4"
            >
                Enviar Aposta
            </button>
            <p class="text-white mb-4">{{ mensagem }}</p>
            <BetSelector :select-bet="selectBet" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from "@microsoft/signalr";
import FuseTimer from '~/components/FuseTimer/';

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>("");

// Timer related refs
const timerDuration = ref(60); // 60 seconds by default
const timerActive = ref(true);
const fuseTimerRef = ref(null);

let connection: HubConnection | null = null;

const enviarAposta = async () => {
    console.log(aposta.value);
    if (connection && connection.state === "Connected") {
        try {
            await connection.invoke("CreateBet", aposta.value, 1);
            mensagem.value = "Aposta enviada!";
            
            // Reset and restart timer after bet is sent
            if (fuseTimerRef.value) {
                fuseTimerRef.value.resetTimer();
                fuseTimerRef.value.startTimer();
            }
        } catch (e) {
            console.log(e);
            // console.log(e.message);
        }
    } else {
        mensagem.value = "Erro ao conectar ao servidor.";
    }
};

function selectBet(bet: number[] | null) {
    aposta.value = bet;
}

function handleTimeUp() {
    mensagem.value = "Tempo esgotado! Faça uma nova aposta.";
    // You could also disable the bet button or take other actions
}

onMounted(() => {
    connection = useNuxtApp().$signalRConnection as HubConnection;

    connection.on("Sorteio", (numeros: number[]) => {
        sorteio.value = numeros;
        
        // Reset and restart timer when new draw numbers arrive
        if (fuseTimerRef.value) {
            fuseTimerRef.value.resetTimer();
            fuseTimerRef.value.startTimer();
        }
    });

    connection.on("Vencedor", (numeros: number[]) => {
        mensagem.value = `🎉 Você ganhou! Números: ${numeros.join(", ")}`;
    });

    connection.on("ApostaConfirmada", (numeros: number[]) => {
        console.log(numeros);
    });
});
</script>

<style scoped>
.header-currency-bg {
    background-color: #2a2a3e; /* Fundo escuro para toda a carteira */
    display: flex;
    align-items: center;
    padding: 3px; /* Pequeno padding para o arredondamento do container externo ser visível e criar a margem interna */
}

.text-e-home-color-103 { /* Usado para "R$" e valor principal do saldo */
    color: #c1c1d1; 
}
.text-e-home-color-114 { /* Usado para o contêiner do valor principal do saldo */
    color: #ffffff; 
}
.text-e-home-color-104 { /* Usado para o sub-valor do saldo */
    color: #8a8a9e; 
}

.header-deposit-btn {
    background-color: #86efac; /* Verde claro (Tailwind green-300) */
    /* A classe text-e-home-color-109 foi removida do HTML deste elemento */
    /* Outros estilos como rounded-[6px], h-[34px], px-[10px] já estão no template */
}

/* Cor do texto e ícone dentro do botão de depósito para ser escuro */
.header-deposit-btn .sysicon-n-withdraw-e,
.header-deposit-btn span {
    color: #1f2937 !important; /* Cinza escuro (Tailwind gray-800), !important para garantir prioridade */
}

.sysicon-n-withdraw-e::before {
    /* Placeholder para o ícone se não estiver globalmente disponível */
    content: "💰"; /* Ícone de exemplo */
    font-family: sans-serif;
    /* A cor será herdada de .header-deposit-btn .sysicon-n-withdraw-e */
}
</style>
