<template>
  <navbar-logic>
    {{ mobile }}
    <navbar-mobile v-if="mobile" />
    <navbar-desktop v-else />
  </navbar-logic>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'
const mobile: Ref<boolean> = useDisplay().smAndDown
</script>