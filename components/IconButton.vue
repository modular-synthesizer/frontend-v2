<template>
  <v-tooltip>
    <template #activator="slotProps">
      <v-btn icon @click="emit('click')">
        <v-icon>{{ props.icon }}</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>

<script lang="ts" setup>
type Props = {
  icon: string
}
const props = defineProps<Props>()

type Emits = {
  click: [ ]
}
const emit = defineEmits<Emits>()
</script>