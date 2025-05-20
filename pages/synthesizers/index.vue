<template>
  <v-container>
    <div class="text-h3">{{ $t('menu.synthesizers') }}</div>
    <synthesizers-creation-modal :synthesizer="creation" @submit="submit" />
    <synthesizers-list :synthesizers>
      <template #synthesizer="synthesizer">
        <synthesizers-card :synthesizer :membership="getMembership(synthesizer, useAuth().username)">
          <template #actions>
            <icon-button @click="() => deletion(synthesizer.id)" icon="mdi-delete" />
          </template>
        </synthesizers-card>
      </template>
    </synthesizers-list>
  </v-container>
</template>

<script lang="ts" setup>
const fetch = fetchSynthesizers(api.synthesizers.list, useSnack());
const synthesizers: Ref<Synthesizer[]> = ref(await fetch());
const creation = ref({ name: '', voices: 16 })
const create = createSynthesizer(api.synthesizers.new, useSnack(), synthesizers.value);
const deletion = removeSynthesizer(api.synthesizers.delete, useSnack(), synthesizers.value)

async function submit(name: string, voices: number) {
  await create(name, voices)
}
</script>