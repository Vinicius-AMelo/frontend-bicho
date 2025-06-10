<template>
    <div class="gradient py-8">
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
                        <span class="whitespace-pre" data-v-a084aa25="">
                            {{ authStore.userBalance }}
                        </span>
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
        <div class="login-paw flex flex-col justify-center items-center gap-6 w-full h-full">
            <Brand />
            <BetDisplay
                :disabled="disabled"
                :mensagem="mensagem"
                :option="aposta?.[0] || 26"
                :sorteio="sorteio"
                :submit="enviarAposta"
            />

            <div class="">
                <BetSelector :select-bet="selectBet" />
            </div>

            <div class="mt-8 w-full max-w-md">
                <table class="simple-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="resultados.length == 0">
                            <td>Nenhum resultado computado!</td>
                            <td>0</td>
                        </tr>
                        <tr
                            v-for="(resultado, index) in resultados"
                            v-if="resultados.length > 0"
                            :key="index"
                        >
                            <td>{{ resultado.user }}</td>
                            <td v-if="resultado.isWinner" class="text-green-400"></td>
                            <td v-if="!resultado.isWinner" class="text-red-400">
                                -{{ resultado.value }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { HubConnection } from '@microsoft/signalr';

const authStore = useAuthStore();

const aposta = ref<number[] | null>(null);
const sorteio = ref<number[]>([0, 0, 0, 0, 0]);
const mensagem = ref<string>('');
const disabled = ref<boolean>(false);
const lastBet = ref<number>(0);
const resultados = ref<any[]>([]);
let connection: HubConnection | null = null;

async function enviarAposta(betValue: number) {
    if (!aposta.value) {
        mensagem.value = 'Por favor, selecione uma aposta.';
        return;
    }

    if (connection && connection.state === 'Connected') {
        try {
            await connection.invoke('CreateBet', aposta.value, Number(authStore.userId), betValue);
            authStore.updateUserBalance(authStore.userBalance - betValue);
            lastBet.value = betValue;
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
        authStore.updateUserBalance(authStore.userBalance + lastBet.value * 2);
    });

    connection.on('ApostaConfirmada', (numeros: number[]) => {
        mensagem.value = `Aposta confirmada!`;
        disabled.value = true;
    });

    connection.on('ResultadosSessao', (data: any) => {
        resultados.value = data;
        console.log(data);
    });

    connection.invoke('JoinSession', 'zaza');
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

.simple-table {
    width: 100%;
    border-collapse: collapse;
    background-color: #000000;
    color: #ffffff;
    border: 1px solid #333333;
}

.simple-table th,
.simple-table td {
    border: 1px solid #333333;
    padding: 8px 12px;
    text-align: left;
}

.simple-table th {
    background-color: #1a1a1a;
    font-weight: bold;
}
</style>
