<template>
  <v-btn @click="display = true">{{ $t('common.verbs.add') }}</v-btn>
  <v-dialog v-model="display" max-width="500">
    <synthesizers-creation-card v-bind="props.synthesizer" @close="display = false" @submit="submit" />
  </v-dialog>
</template>

<script lang="ts" setup>
type Props = {
  synthesizer: Synthesizer,
}
const props = defineProps<Props>()

type Emits = {
  submit: [ string, number ],
}
const emit = defineEmits<Emits>()

const display = ref(false)

function submit(name: string, voices: number) {
  emit("submit", name, voices)
  display.value = false
}
</script>