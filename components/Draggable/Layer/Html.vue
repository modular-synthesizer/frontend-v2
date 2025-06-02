<template>
  <div class="layer-wrapper">
    <div class="layer-scale">
      <div class="layer-translate">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  reference: ScaledCoordinates
}
const { reference } = defineProps<Props>()

const scale = computed(() => `${reference.scale} ${reference.scale}`)
const translate = computed(() => `${reference.x}px ${reference.y}px`)

provide<LayerKind>('layer-kind', 'html')
</script>

<style scoped>
.layer-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.layer-scale {
  scale: v-bind(scale);
  transform-origin: top left;
}
.layer-translate {
  translate: v-bind(translate);
}
</style>