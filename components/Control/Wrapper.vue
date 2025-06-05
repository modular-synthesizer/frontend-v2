<template>
  <ControlLogic>
    <template #default="{ click }">
      <ControlAppearance :selected="selected" :control="control" @click="click" />
    </template>
  </ControlLogic>
</template>

<script lang="ts" setup>
import { controls } from '.';

type Props = {
  control: Control
  selected: boolean
}
const props = defineProps<Props>()

const name: string = props.control.component
const descriptor = name in controls ? controls[name] : controls.Default

const ControlAppearance = descriptor.appearance
const ControlLogic = descriptor.logic
</script>