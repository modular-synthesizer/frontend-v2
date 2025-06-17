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
const reference = inject<ScaledCoordinates>('reference-frame', { x: 0, y: 0, scale: 1.0 })

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
  pointer-events: none;
}
.layer-scale {
  scale: v-bind(scale);
  transform-origin: top left;
}
.layer-translate {
  translate: v-bind(translate);
}
</style>