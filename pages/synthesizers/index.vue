<template>
  <v-container>
    <div class="text-h3 mb-1">{{ $t('menu.synthesizers') }}</div>
    <synthesizers-creation-modal :synthesizer="creation" @submit="create" class="mb-3" />
    <synthesizers-list :synthesizers>
      <template #synthesizer="synthesizer">
        <synthesizers-card :synthesizer :membership="getMembership(synthesizer, useAuth().username)">
          <template #actions>
            <confirm-delete @submit="remove(synthesizer.id)" />
          </template>
        </synthesizers-card>
      </template>
    </synthesizers-list>
  </v-container>
</template>

<script lang="ts" setup>
const fetch = fetchSynthesizers(api.synthesizers.list, useSnack());
const synthesizers: Ref<Synthesizer[]> = ref(await fetch());
const creation = ref({ id: '', name: '', voices: 16, members: [] })
const create = createSynthesizer(api.synthesizers.new, useSnack(), synthesizers.value);
const remove = removeSynthesizer(api.synthesizers.delete, useSnack(), synthesizers.value)
</script>