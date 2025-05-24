<template>
  <svg class="svg-wrapper">
    <g :transform="scale">
      <g :transform="translate">
        <slot />
      </g>
    </g>
  </svg>
</template>

<script lang="ts" setup>
type Props = {
  reference: ScaledCoordinates
}
const { reference } = defineProps<Props>()

const scale = computed(() => `scale(${reference.scale} ${reference.scale})`)
const translate = computed(() => `translate(${reference.x} ${reference.y})`)
</script>

<style scoped>
.svg-wrapper {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0px;
  left: 0px;
}
</style>