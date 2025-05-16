<template>
  <v-snackbar-queue v-model="queue">
    <template #text="{ item }">
      {{ $t(item.text) }}
    </template>
  </v-snackbar-queue>
</template>

<script lang="ts" setup>
const queue = useState<QueueItem[]>('snackbar', () => [])
</script>