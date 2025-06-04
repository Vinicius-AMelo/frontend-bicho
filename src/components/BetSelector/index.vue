<template>
    <div class="flex justify-center flex-wrap gap-4 max-w-[912px] p-8 bg-gray-300 rounded-sm">
        <BetSelectorCard
            v-for="option in betOptions"
            :key="option.number"
            :index="option.number"
            :option="option.number"
            :selected="selected"
            class="border-primary-orange hover:border-blue-500"
            @click="selected !== option.number ? (selected = option.number) : (selected = null)"
        />
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ selectBet: (bet: number[] | null) => void }>();

const betOptions = Array.from({ length: 25 }, (_, i) => ({
    number: i + 1,
}));

const selected = ref<number | null>(null);

watch(selected, () => {
    console.log(selected.value);
    props.selectBet(selected.value ? [betOptions[selected.value - 1].number] : null);
});
</script>
