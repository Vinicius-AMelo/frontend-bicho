<template>
    <div>
        <NuxtPage :key="route.fullPath" />
        <NuxtRouteAnnouncer />
    </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>
