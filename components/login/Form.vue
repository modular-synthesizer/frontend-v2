<template>
  <div>
    <v-text-field v-model="username" />
    <v-text-field v-model="password" />
    <v-btn @click="emit('submit', username, password)">Valider</v-btn>
  </div>
</template>

<script lang="ts" setup>
const username = ref('');
const password = ref('');

type Emits = {
  submit: [ string, string ]
}
const emit = defineEmits<Emits>();
</script>

<style>

</style>