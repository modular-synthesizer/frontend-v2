<template>
  <v-layout class="d-flex flex-column">
    <v-tabs v-model="tab" color="primary" align-tabs="center">
      <v-tab v-for="t in tabs" :value="t.label">{{ $t(`tools.tabs.${t.label}`) }}</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab" class="flex-1-0">
      <v-tabs-window-item v-for="t in tabs" :value="t.label" class="autoscroll">
        <component :is="t.component" :tool />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-layout>
</template>

<script lang="ts" setup>
import { ToolsTabsControls, ToolsTabsInformations, ToolsTabsNodes } from '#components'
import type { Component } from 'vue'

definePageMeta({ layout: false })

type Tab = "controls"|"informations"|"nodes"
const tab: Ref<Tab> = ref("informations")

const tabs: {label: Tab, component: Component}[] = [
  { label: "controls", component: ToolsTabsControls },
  { label: "informations", component: ToolsTabsInformations },
  { label: "nodes", component: ToolsTabsNodes }
]

const tool = ref(await features.tools.fetch(`${useRoute().params.id}`))
</script>

<style scoped>
.autoscroll {
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  overflow-x: hidden;
}
</style>