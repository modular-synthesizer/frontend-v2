<template>
  <v-btn @click="add">Add</v-btn>
  <v-snackbar-queue v-model="useSnack().state.value.queue" />
  <pre>{{ useSnack().state.value.queue }}</pre>
</template>

<script lang="ts" setup>

function add() {
  useSnack().success('test')
}
</script>