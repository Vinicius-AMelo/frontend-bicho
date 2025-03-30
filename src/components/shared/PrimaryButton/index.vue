<template>
    <component
        :is="tag"
        :href="isLink ? href : undefined"
        :to="isNuxtLink ? to : undefined"
        :type="isButton ? type : undefined"
        class="bg-primary-orange h-[40px] w-full rounded-full text-white
            hover:bg-primary-orange-hover hover:scale-[0.98] hover:cursor-pointer
            transition-all"
        v-bind="$attrs"
    >
        <slot />
    </component>
</template>

<script lang="ts" setup>
const { to, href, type } = defineProps<{
    to?: string;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
}>();

const isNuxtLink = computed(() => !!to);
const isLink = computed(() => !!href);
const isButton = computed(() => !to && !href);

const tag = computed(() => {
    if (to) return 'NuxtLink';
    if (href) return 'a';
    return 'button';
});
</script>
