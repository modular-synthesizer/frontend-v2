<template>
  <v-snackbar-queue v-model="useSnack().state.value.queue">
    <template #text="{ item }">
      {{ $t(item.text) }}
    </template>
  </v-snackbar-queue>
</template>