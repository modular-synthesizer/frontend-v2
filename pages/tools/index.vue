<template>
  <dialog-button ref="dialog" @validate="submit(form.tool)">
    <tools-creation-form ref="form" :tool="creation" />
  </dialog-button>
  <v-data-table v-if="tools" :items="tools" />
</template>

<script lang="ts" setup>
import { createTool } from '~/core/factories/tools'

const tools = ref(await features.tools.list())
const creation = ref(createTool())
const form = ref()
const dialog = ref()

function submit(tool: Tool) {
  features.tools.create(tools.value, tool.name, tool.slots)
  dialog.value.close()
  creation.value = createTool()
}
</script>