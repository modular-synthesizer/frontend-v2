<template>
  <v-app-bar color="deep-purple darken-2">
    {{ props.authenticated }}
  </v-app-bar>
</template>

<script setup lang="ts">
type Props = {
  authenticated: boolean
}
const props = defineProps<Props>()
</script>