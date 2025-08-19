<template>
  <dialog-button ref="dialog" @validate="submit(form.tool, form.validate)">
    <tools-creation-form ref="form" :tool="creation" />
  </dialog-button>
  <v-data-table v-if="tools" :items="tools" :headers>
    <template #item.coordinates="{ item }">
      [{{ item.x }};{{ item.y }}]
    </template>
    <template #item.experimental="{ value }">
      <span v-if="value">Oui</span>
    </template>
    <template #item.actions="{ item }">
      <confirm-delete @submit="remove(item.id, tools)" />
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { toolFactory } from '~/core/factories/tools'

const tools = ref(await features.tools.list())
const creation = ref(toolFactory())
const form = ref()
const dialog = ref()

async function submit({ name, slots, categoryId}: Tool, validate: () => boolean) {
  if (await validate()) {
    await features.tools.create(tools.value, name, categoryId, slots)
    dialog.value.close()
    creation.value = toolFactory()
  }
}

const headers = [
  { title: "id", key: "id" },
  { title: 'name', key: 'name'},
  { title: 'coordinates', key: 'coordinates' },
  { title: 'experimental', key: 'experimental' },
  { title: 'actions', key: 'actions' },
]

const remove = removeTool(api, useSnack())
</script>