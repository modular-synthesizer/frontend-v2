<template>
  <v-form @submit.prevent.stop="submit($event as unknown as SubmissionEvent)">
    <v-card>
      <v-card-title>{{ $t('synthesizers.create.title') }}</v-card-title>
      <v-card-text>
        <v-text-field
          class="mb-3"
          :label="$t('synthesizers.create.labels.name')"
          :placeholder="$t('synthesizers.create.placeholders.name')"
          :rules="[rules.required(), rules.minLength(6)]"
          variant="outlined"
          v-model="name"
        />
        <v-text-field
          class="mb-3"
          :label="$t('synthesizers.create.labels.voices')"
          max="256"
          min="1"
          :placeholder="$t('synthesizers.create.placeholders.voices')"
          :rules="[rules.required(), rules.integer()]"
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
import { useRules, type RuleAliases } from 'vuetify/labs/rules';
import type { SubmissionEvent } from '~/types/forms';

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
const rules: RuleAliases = useRules() as RuleAliases

async function submit(event: SubmissionEvent) {
  const form = await event;
  if (form.valid) emit("submit", name.value, voices.value)
}
</script>