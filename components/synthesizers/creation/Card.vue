<template>
  <v-form @submit.prevent.stop="submit">
    <v-card>
      <v-card-title>{{ $t('synthesizers.create.title') }}</v-card-title>
      <v-card-text>
        <v-text-field
          :label="$t('synthesizers.create.labels.name')"
          :placeholder="$t('synthesizers.create.placeholders.name')"
          variant="outlined"
          v-model="name"
        />
        <v-text-field
          :label="$t('synthesizers.create.labels.voices')"
          max="256"
          min="1"
          :placeholder="$t('synthesizers.create.placeholders.voices')"
          type="number"
          v-model="voices"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit">{{ $t('common.verbs.validate') }}</v-btn>
        <v-btn @click="emit('close')">{{ $t('common.verbs.close') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
type Props = {
  name: string,
  voices: number
}
const props = defineProps<Props>()

type Emits = {
  close: [ ],
  submit: [ string, number ],
}
const emit = defineEmits<Emits>()

const name = ref(props.name)
const voices = ref(props.voices)

function submit() {
  emit("submit", name.value, voices.value)
}
</script>