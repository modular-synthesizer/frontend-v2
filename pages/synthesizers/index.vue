<template>
  <v-container>
    <div class="text-h3 mb-1">{{ $t('menu.synthesizers') }}</div>
    <synthesizers-creation-modal :synthesizer="creation" @submit="createAndPush" class="mb-3" />
    <synthesizers-list :synthesizers>
      <template #synthesizer="synthesizer">
        <synthesizers-card :synthesizer :membership="getMembership(synthesizer, useAuth().username)">
          <template #actions>
            <confirm-delete @submit="remove(synthesizer.id, synthesizers)" />
          </template>
        </synthesizers-card>
      </template>
    </synthesizers-list>
  </v-container>
</template>

<script lang="ts" setup>
const { list, create, remove } = features.synthesizers;
const synthesizers: Ref<Synthesizer[]> = ref(await list());
const creation = ref({ id: '', name: '', voices: 16, members: [] })

function createAndPush(name: string, voices: number) {
  create(name, voices, synthesizers.value)
}
</script>