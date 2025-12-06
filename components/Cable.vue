<template>
  <path :d="path" stroke="red" stroke-width="3" />
  <circle :r="15" fill="red" :cx="from.x" :cy="from.y" />
  <circle :r="11" fill="white" :cx="from.x" :cy="from.y" />
  <circle :r="15" fill="red" :cx="to.x" :cy="to.y" />
  <circle :r="11" fill="white" :cx="to.x" :cy="to.y" />
</template>

<script lang="ts" setup>
import type { Cable } from "@jsynple/core"
type Props = { cable: Cable }

const { cable } = defineProps<Props>()

console.log(cable)

function getAbsoluteCoordinates(control: Cable['from']): Coordinates {
  return {
    x: control.module.slot * SLOT_WIDTH + control.payload.x,
    y: control.module.rack * RACK_HEIGHT + control.payload.y,
  }
}

const from: ComputedRef<Coordinates> = computed(() => getAbsoluteCoordinates(cable.from))
const to: ComputedRef<Coordinates> = computed(() => getAbsoluteCoordinates(cable.to))

const path: ComputedRef<string> = computed(() => {
  return `M ${from.value.x} ${from.value.y} L ${to.value.x} ${to.value.y}`
})
</script>
