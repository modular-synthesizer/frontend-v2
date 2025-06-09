<template>
  <div :class="['item', 'wrapper', { selected }]"></div>
  <div class="item value">12</div>
</template>

<script lang="ts" setup>
import type { KnobControl } from '~/core/business/tools/Control.type';

type Props = {
  control: KnobControl
  selected: boolean
}
const props = defineProps<Props>()

const RADIUS = 15;
const DIAMETER = RADIUS * 2

const x = computed(() => +props.control.payload.x - RADIUS)
const y = computed(() => +props.control.payload.y - RADIUS)
const translate = computed(() => `${x.value}px ${y.value}px`)
const diameter = computed(() => `${DIAMETER}px`)
const radius = computed(() => `${RADIUS}px`)
</script>

<style scoped>
.item {
  width: v-bind(diameter);
  height: v-bind(diameter);
  position: absolute;
  translate: v-bind(translate);
}
.wrapper {
  background-color: pink;
  border-radius: v-bind(radius);
}
.selected {
  box-sizing: border-box;
  border: 5px solid red;
}
.value {
  text-align: center;
  line-height: v-bind(diameter);
  user-select: none;
}
</style>