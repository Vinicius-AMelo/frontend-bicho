<template>
    <component
        :is="tag"
        :class="[
            `bg-primary-orange h-10 w-full rounded-sm text-white hover:bg-primary-orange-hover hover:scale-[0.98]
            hover:cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed`,
            customClass,
        ]"
        :disabled="disabled"
        :href="isLink ? href : undefined"
        :to="isNuxtLink ? to : undefined"
        :type="isButton ? type : undefined"
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
    customClass?: string;
    disabled?: boolean;
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
