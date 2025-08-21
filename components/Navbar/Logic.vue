<template>
  <slot :authenticated :logout :mobile />
</template>

<script setup lang="ts">
const mobile: Ref<boolean> = ref(false)
const authenticated: ComputedRef<boolean> = computed(() => useAuth().authenticated);
const logout = features.sessions.logout
</script>