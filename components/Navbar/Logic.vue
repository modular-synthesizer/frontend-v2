<template>
  <slot :authenticated :logout />
</template>

<script setup lang="ts">
const authenticated: ComputedRef<boolean> = computed(() => useAuth().authenticated);
const logout = attemptLogout(navigateTo, useAuth().reset)
</script>