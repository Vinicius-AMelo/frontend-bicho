<template>
    <input
        :class="[
            `font-public border-primary-orange bg-primary-darkblue w-[260px] h-10 rounded-sm border px-3 py-2
            text-sm text-white placeholder-white focus:border-green-300`,
            customClass,
        ]"
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        @input="onInput"
    />
</template>

<script lang="ts" setup>
defineProps<{
    modelValue: string | number;
    type: 'text' | 'password' | 'number' | 'email';
    placeholder?: string;
    customClass?: string;
}>();

const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>
