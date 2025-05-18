<template>
  <v-container>
    <div class="text-h3">Synthétiseurs</div>
    <synthesizers-list :synthesizers>
      <template #synthesizer="synthesizer">
        <synthesizers-card :synthesizer :membership="getMembership(synthesizer, useAuth().username)" />
      </template>
    </synthesizers-list>
  </v-container>
</template>

<script lang="ts" setup>
const fetch = fetchSynthesizers(api.synthesizers.list, useSnack());
const synthesizers: Synthesizer[] = ref(await fetch());
</script>