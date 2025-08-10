<template>
  <dialog-button ref="dialog" @validate="submit(form.tool, form.validate)">
    <tools-creation-form ref="form" :tool="creation" />
  </dialog-button>
  <v-data-table v-if="tools" :items="tools" />
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
</script>