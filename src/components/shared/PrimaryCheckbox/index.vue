<template>
    <div class="flex gap-2">
        <input :checked="modelValue" name="checkbox" type="checkbox" />
        <label class="text-white" for="checkbox" v-bind="$attrs">
            {{ label }}
        </label>
    </div>
</template>

<script lang="ts" setup>
defineProps<{ modelValue: boolean; label: string }>();
</script>
