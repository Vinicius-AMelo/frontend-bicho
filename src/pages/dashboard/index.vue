<template>
    <div>hello</div>
</template>

<script lang="ts" setup>
import { useApi } from '~/composables/api';

onMounted(async () => {
    const { data, error, status } = await useApi<{ token: string }>('/user', {
        method: 'GET',
    });
});
</script>
<style scoped></style>
