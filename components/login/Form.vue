<template>
  <v-form @submit.prevent.stop="submit">
    <v-text-field
      autocomplete="username"
      class="mb-3"
      :label="$t('login.form.labels.username')"
      :placeholder="$t('login.form.placeholders.username')"
      v-model="username"
      variant="outlined"
    />
    <v-text-field
      autocomplete="password"
      class="mb-3"
      :label="$t('login.form.labels.password')"
      :placeholder="$t('login.form.placeholders.password')"
      type="password"
      v-model="password"
    />
    <v-btn type="submit">{{ $t('common.verbs.validate') }}</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
const username = ref('');
const password = ref('');

type Emits = {
  submit: [ string, string ]
}
const emit = defineEmits<Emits>();

function submit() {
  emit('submit', username.value, password.value)
}
</script>