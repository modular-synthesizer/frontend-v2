<template>
  <navbar-logic #default="{ authenticated }">
    <navbar-mobile v-if="mobile" :authenticated />
    <navbar-desktop v-else :authenticated />
  </navbar-logic>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const mobile: Ref<boolean> = useDisplay().smAndDown
</script>