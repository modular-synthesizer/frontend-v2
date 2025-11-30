<template>
  <slot />
</template>

<script lang="ts" setup>
import type { Module, Synthesizer } from '@jsynple/core';
defineProps<{ control: Control, module: Module, synthesizer: Synthesizer }>()
</script>