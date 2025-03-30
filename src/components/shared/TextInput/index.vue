<template>
    <input
        :placeholder="placeholder"
        :type="type"
        :value="modelValue"
        class="font-public border-primary-orange bg-primary-darkblue w-[260px] rounded-full
            border px-3 py-2 text-sm text-white placeholder-white focus:border-green-300"
        @input="onInput"
    />
</template>

<script lang="ts" setup>
defineProps<{
    modelValue: string;
    type: 'text' | 'password';
    placeholder: string;
}>();

const emit = defineEmits(['update:modelValue']);

function onInput(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('update:modelValue', target.value);
}
</script>
