<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack(), navigateTo, storage)"></slot>
</template>

<script setup lang="ts">
import { useStorage } from "@vueuse/core"

function storage(name: string, data: unknown) {
  return useStorage(name, data, sessionStorage)
}
</script>