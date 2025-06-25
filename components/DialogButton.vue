<template>
  <div>
    <v-btn @click="display = true">{{ $t(translation) }}</v-btn>
    <v-dialog v-model="display" :max-width="maxWidth">
      <v-card>
        <v-card-text>
          <slot />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="emit('validate')">OK</v-btn>
          <v-btn @click="close() && emit('close')">Annuler</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
type Props = {
  maxWidth?: number;
  translation?: string;
}
const {
  maxWidth = 500,
  translation = 'common.verbs.add'
} = defineProps<Props>()

const display = ref(false)

type Emits = { validate: [ ], cancel: [ ] }
const emit = defineEmits<Emits>()

const close = () => {
  display.value = false
}

defineExpose({ close })
</script>