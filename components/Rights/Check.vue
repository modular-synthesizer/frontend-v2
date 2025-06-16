<template>
  <template v-if="able">
    <slot />
  </template>
</template>

<script lang="ts" setup>
type Props = {
  right: string;
  type?: 'hide'|'redirect';
  uri?: string;
}

const { right, type = 'hide', uri = '/'} = defineProps<Props>();

const able: Ref<boolean> = ref(await useAuth().can(right));
if (!able.value && type === 'redirect') navigateTo(uri)
</script>