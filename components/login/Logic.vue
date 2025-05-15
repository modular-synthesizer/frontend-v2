<template>
  <slot :submit="attemptLogin"></slot>
</template>

<script setup type="ts">
import { attemptLogin } from '~/lib/stories/attemptLogin.ts'
</script>