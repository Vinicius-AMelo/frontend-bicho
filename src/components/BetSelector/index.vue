<template>
    <div class="flex justify-center flex-wrap gap-2 max-w-[840px]">
        <div
            v-for="(option, index) in betOptions"
            :key="option.number"
            :class="{ selected: index === selected }"
            class="box flex h-[120px] w-[80px] flex-wrap rounded-sm overflow-hidden"
            @click="selected !== index ? (selected = index) : (selected = null)"
        >
            <img :src="card1" class="w-full h-full" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ selectBet: (bet: number[] | null) => void }>();
const card1 = ref<string>('~/assets/images/1.png');
const betOptions = Array.from({ length: 25 }, (_, i) => ({
    number: i + 1,
    imageUrl: `/images/${i + 1}.png`,
}));

const selected = ref<number | null>(null);

watch(selected, () => {
    if (selected.value !== null) {
        props.selectBet([betOptions[selected.value].number]);
    } else {
        props.selectBet(null);
    }
});
</script>
