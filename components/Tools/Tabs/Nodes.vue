<template>
  <draggable-scene :reference-frame="tool" :height @rescale="rescale">
    <draggable-layer-html>
      <draggable-box v-for="n in tool.nodes" :coordinates="n" @move="c => move(n, c)">
        <div class="node">
          <div class="node-name">{{ n.name }}</div>
        </div>
      </draggable-box>
    </draggable-layer-html>
  </draggable-scene>
</template>

<script setup lang="ts">
type Props = { tool: Tool }
const { tool } = defineProps<Props>()
const height = "calc(100vh - 48px)"

function move(n: ToolNode, { x, y }: Coordinates) {
  n.x = x;
  n.y = y;
}

function rescale(deltaY: number) {
  features.tools.rescale(tool, deltaY)
}
</script>

<style scoped>
.node {
  background-color: black;
  font-size: 20px;
}
.node > .node-name {
  padding: 10px;
}
</style>