<template>
  <slot :authenticated :logout :mobile />
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
const mobile: Ref<boolean> = useDisplay().smAndDown
const authenticated: ComputedRef<boolean> = computed(() => useAuth().authenticated);
const logout = features.sessions.logout
</script>