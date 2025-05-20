<template>
  <slot name="button" :open="open">
    <v-icon-btn icon="mdi-delete" @click="open" />
  </slot>
  <v-dialog width="400" v-model="model">
    <v-card>
      <v-card-text>
        <slot name="text">{{  $t('common.deletion.confirm') }}</slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">{{ $t('common.verbs.cancel') }}</v-btn>
        <v-btn color="error" @click="submit">{{ $t('common.verbs.delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
type Emits = {
  submit: [ ]
}
const emit = defineEmits<Emits>()

const model = ref(false)

function open() {
  model.value = true
}

function close() {
  model.value = false
}

function submit() {
  emit('submit')
  close()
}
</script>