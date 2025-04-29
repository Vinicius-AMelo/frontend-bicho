<template>
    <div class="flex gap-[1px] w-[414px] flex-wrap">
        <div
            v-for="(group, index) in betOptions"
            :key="index"
            :class="{ selected: index == selected }"
            class="box flex h-[82px] w-[82px] flex-wrap"
            @click="selected != index ? (selected = index) : (selected = null)"
        >
            <div
                v-for="num in group"
                :key="num"
                class="w-[40px] h-[40px] text-[10px] flex justify-center items-center"
            >
                {{ num }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ selectBet: (index: number[] | null) => void }>();

const betOptions = chunkArray(0, 99, 4);
const selected = ref<number | null>(null);
console.log(betOptions);

function chunkArray(start: number, end: number, size: number) {
    const array = Array.from({ length: end - start + 1 }, (_, i) => i + start);
    const result: number[][] = [];

    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }

    return result;
}

watch(selected, () => {
    props.selectBet(betOptions[selected.value!]);
});
</script>
<style scoped>
.box {
    --b: 1px;
    --c: red;
    --w: 10px;

    border: var(--b) solid #0000;
    --_g: #0000 90deg, var(--c) 0;
    --_p: var(--w) var(--w) border-box no-repeat;
    background:
        conic-gradient(from 90deg at top var(--b) left var(--b), var(--_g)) 0 0 / var(--_p),
        conic-gradient(from 180deg at top var(--b) right var(--b), var(--_g)) 100% 0 / var(--_p),
        conic-gradient(from 0deg at bottom var(--b) left var(--b), var(--_g)) 0 100% / var(--_p),
        conic-gradient(from -90deg at bottom var(--b) right var(--b), var(--_g)) 100% 100% /
            var(--_p);
}

.box.selected {
    --c: green;
}
</style>
