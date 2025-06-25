<template>
  <v-btn @click="submit">pouet</v-btn>
</template>

<script setup lang="ts">

const emit = defineEmits<{ submit: [ ] }>()

const submit = () => {
  if (confirm("on ferme ?")) {
    emit("submit")
  }
}

defineExpose({ submit })
</script>