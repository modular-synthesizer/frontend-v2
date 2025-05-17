<template>
  <navbar-logic #default="{ authenticated, logout }">
    <navbar-mobile v-if="mobile" :authenticated :logout />
    <navbar-desktop v-else :authenticated :logout />
  </navbar-logic>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const mobile: Ref<boolean> = useDisplay().smAndDown
</script>