<template>
  <slot :authenticated />
</template>

<script setup lang="ts">
const authenticated = ref(useAuth().authenticated)
</script>