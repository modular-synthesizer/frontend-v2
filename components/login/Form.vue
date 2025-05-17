<template>
  <div>
    <v-text-field v-model="username" variant="outlined" :label="$t('login.form.labels.username')" />
    <v-text-field v-model="password" type="password" />
    <v-btn @click="emit('submit', username, password)">{{ $t('common.verbs.validate') }}</v-btn>
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