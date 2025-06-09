<template>
  <ControlLogic :control :module :synthesizer>
    <ControlAppearance :selected :control :module />
  </ControlLogic>
</template>

<script lang="ts" setup>
import { controls } from '.';

type Props = {
  synthesizer: Synthesizer
  module: Module
  control: Control
  selected: boolean
}
const props = defineProps<Props>()

const name: string = props.control.component
const descriptor = name in controls ? controls[name] : controls.Default

const ControlAppearance = descriptor.appearance
const ControlLogic = descriptor.logic
</script>