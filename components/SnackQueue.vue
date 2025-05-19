<template>
  <v-snackbar-queue v-model="useSnack().queue.value">
    <template #text="{ item }">
      {{ $t(item.text) }}
    </template>
  </v-snackbar-queue>
</template>

