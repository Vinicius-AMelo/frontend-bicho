<template>
    <div
        :class="[
            { selected: option === selected },
            `${option === selected && '!border-green-400'}`,
            `${disabled && '!border-red-600'}`,
        ]"
        class="box flex h-[120px] min-w-[80px] max-w-[80px] flex-wrap rounded-sm overflow-hidden relative
            cursor-pointer border-2 transition-all duration-300 ease-in-out"
    >
        <div
            v-if="option != 26"
            class="absolute top-0 left-0 flex justify-between items z-10 w-full h-full pt-1 pl-1"
        >
            <p>{{ option }}</p>
        </div>

        <img
            v-if="option && option != 26"
            :src="cards[option - 1]"
            alt="Animal Selecionável"
            class="w-full h-full"
        />

        <div
            :class="`${option != 26 && disabled && display && '!top-0'}`"
            class="h-6 w-6 flex justify-center items-center bg-red-600 absolute top-[-25px] transition-all duration-300
                ease-in-out right-1 z-20"
        >
            <IconLock class="w-4 h-4" />
        </div>

        <div
            v-if="option == 26"
            class="w-full h-full bg-gray-500 text-white text-[32px] flex justify-center items-center"
        >
            ?
        </div>
    </div>
</template>

<script lang="ts" setup>
import cards from '~/helpers/cards';
import IconLock from '~/components/icons/IconLock.vue';

const { selected, option, disabled, display } = defineProps<{
    selected?: number | null;
    option: number | null;
    disabled?: boolean;
    display?: boolean;
}>();
</script>
