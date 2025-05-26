<template>
  <rect :x="20 * props.module.slot" :width="20 * props.module.slots" :y="400 * props.module.rack" height="400" fill="red" stroke="black" />
</template>

<script setup lang="ts">
type Props = {
  module: Module
}
const props = defineProps<Props>()
</script>