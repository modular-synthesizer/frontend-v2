<template>
  <template v-if="referenceFrame">
    <g v-if="kind === 'svg'" @mousedown.prevent.stop="drag" :transform >
      <slot />
    </g>
    <div v-if="kind === 'html'" class="box-wrapper"  @mousedown.prevent.stop="drag">
      <slot />
    </div>
  </template>
</template>

<script lang="ts" setup>

type Props = {
  coordinates: Coordinates
}
const { coordinates } = defineProps<Props>()

type Emits = { drop: [ ], move: [ Coordinates ] }
const emit = defineEmits<Emits>()

const referenceFrame = inject<ScaledCoordinates>('reference-frame', { x: 0, y: 0, scale: 1.0 })

function drag({ x, y }: Coordinates) {
  const origin: ScaledCoordinates = { ...coordinates, scale: referenceFrame.scale }
  useSelection().lock()
  useDragEvents().start(origin, { x, y }, { move, drop })
}

const transform = computed(() => `translate(${coordinates.x} ${coordinates.y})`)

const htmlTransform = computed(() => `${coordinates.x}px ${coordinates.y}px`)

function move({ x, y }: Coordinates) {
  emit('move', { x, y })
}

function drop(_: Coordinates) {
  emit('drop')
}

const kind: LayerKind = inject('layer-kind', 'svg')
</script>

<style scoped>
.box-wrapper {
  translate: v-bind(htmlTransform);
  position: absolute;
  pointer-events: all;
}
</style>