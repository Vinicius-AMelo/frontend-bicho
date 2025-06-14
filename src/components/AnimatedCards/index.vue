﻿<template>
    <div class="w-[384px]">
        <div class="w-full flex overflow-hidden">
            <div
                v-for="(number, index) in props.numbers"
                :key="number"
                :style="{ transform: `translateX(${animation.position}px)` }"
                class="card-wrapper min-w-[80px] mx-2 h-[120px] rounded-md overflow-hidden"
            >
                <div
                    :class="{ flipped: flippedCards.includes(index) }"
                    class="card relative w-full h-full"
                >
                    <div class="card-back flex items-center justify-center bg-gray-400">?</div>
                    <BetSelectorCard :option="number" class="card-front" />
                </div>
            </div>
            <div
                :style="{ transform: `translateX(${animation.position}px)` }"
                class="w-[80px] mx-2 h-[120px] rounded-md bg-gray-400 flex items-center justify-center"
            >
                ?
            </div>
            <div
                :style="{ transform: `translateX(${animation.position}px)` }"
                class="w-[80px] mx-2 h-[120px] rounded-md bg-gray-400 flex items-center justify-center"
            >
                ?
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ numbers: number[] }>();

const defaultAnimation = {
    position: 0,
    speed: -30,
    animationFrame: 0,
    times: 0,
    freshRate: 10,
    speedRate: 1,
};

const animation = reactive({ ...defaultAnimation });
const flippedCards = reactive<number[]>([]);

function flipCards() {
    props.numbers.forEach((_, index) => {
        setTimeout(() => {
            flippedCards.push(index);
        }, index * 700);
    });
}

function animate() {
    if (animation.times > 0 && animation.times % animation.freshRate == 0) {
        animation.speed += animation.speedRate;
        if (animation.speed >= -animation.speedRate) animation.speed = -animation.speedRate;
    }

    animation.position += animation.speed;

    if (
        animation.position <= -96 ||
        (animation.speed <= -animation.speedRate && animation.position % 96 == 0)
    ) {
        animation.position = 0;
    }

    if (animation.speed < -animation.speedRate || animation.position != 0) {
        animation.animationFrame = requestAnimationFrame(animate);
        animation.times++;
    } else flipCards();
}

watch(
    () => props.numbers,
    () => {
        flippedCards.length = 0;
        Object.assign(animation, defaultAnimation);
        animate();
    }
);

onUnmounted(() => {
    cancelAnimationFrame(animation.animationFrame);
});
</script>

<style scoped>
.card-wrapper {
    perspective: 1000px;
}

.card {
    transform-style: preserve-3d;
}

.card.flipped {
    animation: rotateCard 0.7s ease-in-out forwards;
}

.card-back,
.card-front {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.card-front {
    transform: rotateY(180deg);
}

@keyframes rotateCard {
    0% {
        transform: rotateY(0deg);
    }
    75% {
        transform: rotateY(85deg);
    }
    100% {
        transform: rotateY(180deg);
    }
}
</style>
