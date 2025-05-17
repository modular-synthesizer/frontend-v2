<template>
  <v-btn icon to="/" aria-label="home link">
    <v-icon>mdi-home</v-icon>
  </v-btn>
  <v-app-bar color="deep-purple darken-2" v-if="authenticated">
    <v-btn icon to="/synthesizers" class="ml-2" aria-label="synthesizers list">
      <v-icon>mdi-piano</v-icon>
    </v-btn>
  </v-app-bar>
  <v-app-bar v-else>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/login">
            <v-list-item-title>{{ $t('common.verbs.login') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
type Props = {
  authenticated: boolean
}
const props = defineProps<Props>()
</script>