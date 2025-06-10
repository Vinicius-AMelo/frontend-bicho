<template>
    <div class="bg-[#1a1c23] min-h-screen flex flex-col items-center text-white font-sans">
        <!-- Header -->
        <header class="w-full max-w-md bg-[#23262f] p-4 flex justify-between items-center sticky top-0 z-10">
            <h1 class="text-lg font-semibold">Depósito</h1>
            <NuxtLink to="/game" class="text-2xl text-gray-400 hover:text-white">
                &times;
            </NuxtLink>
        </header>

        <main class="w-full max-w-md p-4 flex-grow">
            <!-- Payment Method (PIX implied) -->
            <div class="mb-6 p-3 bg-[#23262f] rounded-lg flex items-center justify-between">
                <div class="flex items-center">
                    <p>❖</p>
                    <span class="font-semibold">PIX</span>
                </div>
                <div class="text-right">
                    <span class="text-sm text-gray-400 block">10 - 50.000 BRL</span>
                    <span class="text-xs text-green-400 bg-green-500 bg-opacity-20 px-2 py-1 rounded-sm">PAZ!</span>
                </div>
            </div>

            <!-- Amount Input -->
            <div class="mb-6">
                <label for="depositAmount" class="block text-sm text-gray-400 mb-1">Valor do depósito (BRL)</label>
                <div class="relative">
                    <input
                        type="number"
                        id="depositAmount"
                        v-model.number="depositAmount"
                        placeholder="50"
                        class="w-full bg-[#23262f] border border-[#30333c] rounded-lg p-3 text-white focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
                        @input="clearPresetSelection"
                    >
                    <!-- Placeholder for BRL if needed, or just rely on label -->
                </div>
                <p class="text-xs text-gray-500 mt-1">Mínimo 10 BRL, Máximo 50.000 BRL</p>
            </div>

            <!-- Preset Amount Buttons -->
            <div class="grid grid-cols-3 gap-3 mb-6">
                <button
                    v-for="amount in presetAmounts"
                    :key="amount.value"
                    @click="selectPresetAmount(amount.value)"
                    :class="['bg-[#2c2f3a] hover:bg-[#383c4a] text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors', { 'ring-2 ring-green-500 bg-[#383c4a]': selectedPreset === amount.value } ]"
                >
                    R$ {{ amount.label }}
                    <p>🔥</p>
                </button>
            </div>

            <!-- Total Display -->
            <div class="flex justify-end items-center mb-6">
                <span class="text-gray-400 mr-2">Total:</span>
                <span class="text-green-400 font-bold text-lg">{{ formattedTotalAmount }} BRL</span>
            </div>

            <!-- Deposit Button -->
            <NuxtLink to="/Game"
                      @click="processDeposit"
                      class="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-43 rounded-lg text-lg transition-all"
            >
                Depósito
            </NuxtLink>

            <!-- Informational Messages -->
            <div class="mt-6 text-xs text-gray-500 space-y-2">
                <p>1. Sua recarga será creditada em até 2 minutos. Em caso de atraso por flutuações bancárias ou
                    manutenção, entre em contato com o suporte ao cliente para assistência.</p>
                <p>2. Por favor, gere um novo código QR de depósito a cada recarga. Não use o código QR antigo.</p>
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

const depositAmount = ref<number | null>(50); // Default to 50 as in the image
const selectedPreset = ref<number | null>(50); // Default selected preset

interface PresetAmount {
    value: number;
    label: string;
    hot?: boolean;
}

const presetAmounts: PresetAmount[] = [
    { value: 20, label: '20' },
    { value: 50, label: '50', hot: true },
    { value: 100, label: '100', hot: true },
    { value: 200, label: '200', hot: true },
    { value: 500, label: '500', hot: true },
    { value: 1000, label: '1.000' },
    { value: 2000, label: '2.000' },
    { value: 5000, label: '5.000' },
    { value: 10000, label: '10.000' },
];

const formattedTotalAmount = computed(() => {
    const amount = depositAmount.value === null || depositAmount.value === 0 ? selectedPreset.value : depositAmount.value;
    return (amount ?? 0).toLocaleString('pt-BR');
});

const selectPresetAmount = (amount: number) => {
    selectedPreset.value = amount;
    depositAmount.value = amount;
};

const clearPresetSelection = () => {
    // If user types, and it's not one of the presets, clear preset selection
    if (!presetAmounts.some(p => p.value === depositAmount.value)) {
        selectedPreset.value = null;
    }
};

const closeDeposit = () => {
    // Placeholder: Implement navigation logic, e.g., back or to a specific page
    console.log('Close deposit page');
    // Example: navigateTo('/'); or useRouter().back();
    // Make sure to import useRouter from 'vue-router' or use Nuxt's navigateTo
    if (typeof navigateTo === 'function') {
        navigateTo('/'); // Or appropriate route
    } else {
        alert('Navigation logic for close not implemented in this example.');
    }
};

const processDeposit = () => {
    const finalAmount = depositAmount.value === null || depositAmount.value === 0 ? selectedPreset.value : depositAmount.value;
    if (finalAmount && finalAmount >= 10 && finalAmount <= 50000) {
        console.log(`Processing deposit of ${finalAmount} BRL`);
        alert(`Depósito de R$ ${finalAmount.toLocaleString('pt-BR')} finalizado!`);
        // Placeholder: Implement actual deposit logic (e.g., API call)
    } else {
        alert('Por favor, insira um valor de depósito válido (10 - 50.000 BRL).');
    }
};

// Watch for changes in depositAmount to update selectedPreset if it matches
watch(depositAmount, (newValue) => {
    const matchingPreset = presetAmounts.find(p => p.value === newValue);
    if (matchingPreset) {
        selectedPreset.value = newValue;
    } else {
        // If the new value is not null and not a preset, clear preset selection
        if (newValue !== null) {
            selectedPreset.value = null;
        }
    }
});

</script>

<style scoped>
/* Additional custom styles if Tailwind is not enough or for very specific things */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
}

/* A more specific fire icon could be an SVG or a proper image asset */
.ml-1.w-4.h-4 {
    /* In case the icon8 URL is not preferred or for offline */
    /* content: url('path/to/local/fire-icon.svg'); */
}
</style>