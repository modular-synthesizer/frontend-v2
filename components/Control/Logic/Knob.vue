<template>
  <slot :click="click" />
</template>

<script setup lang="ts">
function click($event: MouseEvent) {
  alert("test")
}
</script>