<template>
    <div class="flex flex-wrap gap-0 p-0 bg-primary-darkblue rounded-md max-w-[800px] justify-center">
        <div
            v-for="(group, index) in betOptions"
            :key="index"
            :class="{ 'selected': index === selected }"
            class="box flex flex-col h-[68px] w-[68px] items-center justify-center relative cursor-pointer transition-all duration-150 ease-in-out transform hover:scale-90"
            @click="toggleSelection(index)"
        >
            <!-- Animal Emoji -->
            <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-2xl opacity- z-0">{{ getAnimalEmoji(index) }}</span>
            </div>

            <!-- Numbers Grid -->
            <div class="grid grid-cols-2 gap-px z-10">
                <div
                    v-for="numInGroup in group"
                    :key="numInGroup"
                    class="w-[38px] h-[38px] text-base flex justify-center items-center font-bold text-white"
                >
                    {{ String(numInGroup).padStart(2, '0') }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const props = defineProps<{ selectBet: (selectedGroup: number[] | null) => void }>();

// Generates numbers from 0 to 99 and chunks them into groups of 4
const betOptions = (() => {
    const options: number[][] = [];
    const numbers = Array.from({ length: 100 }, (_, i) => i); // 0-99
    for (let i = 0; i < numbers.length; i += 4) {
        options.push(numbers.slice(i, i + 4));
    }
    return options;
})();

const selected = ref<number | null>(null);

// Mapeamento dos animais do jogo do bicho para emojis
// Cada grupo de 4 números corresponde a um animal
const animalEmojis = [
    '🦌', // Avestruz (01-04)
    '🦅', // Águia (05-08)
    '🐴', // Burro (09-12)
    '🦋', // Borboleta (13-16)
    '🐕', // Cachorro (17-20)
    '🐐', // Cabra (21-24)
    '🐫', // Camelo (25-28)
    '🐍', // Cobra (29-32)
    '🐇', // Coelho (33-36)
    '🐊', // Jacaré (37-40)
    '🦁', // Leão (41-44)
    '🐒', // Macaco (45-48)
    '🐖', // Porco (49-52)
    '🦚', // Pavão (53-56)
    '🦃', // Peru (57-60)
    '🐂', // Touro (61-64)
    '🐅', // Tigre (65-68)
    '🐻', // Urso (69-72)
    '🦌', // Veado (73-76)
    '🐎', // Cavalo (77-80)
    '🐘', // Elefante (81-84)
    '🐓', // Galo (85-88)
    '🐱', // Gato (89-92)
    '🐸', // Sapo (93-96)
    '🐭', // Rato (97-00)
];

// Função para obter o emoji do animal com base no índice do grupo
function getAnimalEmoji(groupIndex: number) {
    // Cada grupo tem 4 números, então dividimos por 1 para obter o índice do animal
    // Usamos módulo 25 para garantir que não ultrapasse o tamanho do array
    return animalEmojis[groupIndex % 25];
}

function toggleSelection(index: number) {
    if (selected.value === index) {
        selected.value = null;
    } else {
        selected.value = index;
    }
}

watch(selected, (currentIndex) => {
    if (currentIndex !== null && betOptions[currentIndex]) {
        props.selectBet(betOptions[currentIndex]);
    } else {
        props.selectBet(null);
    }
});
</script>

<style scoped>
.box {
    --b: 1px; /* border thickness */
    --w: 10px; /* corner length */
    border: var(--b) solid transparent; /* Base transparent border */
    --c: #ef4444; /* Default corner color (Tailwind red-500) */
    --_g: transparent 90deg, var(--c) 0; /* Gradient for corners */
    --_p: var(--w) var(--w) border-box no-repeat; /* Position and size of corners */
    background:
        conic-gradient(from 90deg at top var(--b) left var(--b), var(--_g)) 0 0 / var(--_p),
        conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) 100% 0 / var(--_p),
        conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0 100% / var(--_p),
        conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g)) 100% 100% / var(--_p);
}

.box.selected {
    --c: #22c55e; /* Selected corner color (Tailwind green-500) */
}

.text-white {
    color: #FFFFFF;
}

.bg-primary-darkblue {
    background-color: var(--color-primary-darkblue, #020035);
}
</style>
