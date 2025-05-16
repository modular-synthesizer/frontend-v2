<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack())"></slot>
</template>


<script lang="ts" setup>
const queue = useState<QueueItem[]>('snackbar')
</script>