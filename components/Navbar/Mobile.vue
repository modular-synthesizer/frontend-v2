<template>
  <v-app-bar color="deep-purple darken-2">
    <template v-slot:prepend>
      <v-btn icon to="/" aria-label="home link">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon to="/synthesizers" class="ml-2" aria-label="synthesizers list"  v-if="authenticated">
        <v-icon>mdi-piano</v-icon>
      </v-btn>
    </template>
    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list v-if="authenticated">
          <v-list-item @click="logout()">
            <v-list-item-title>{{ $t('common.verbs.logout') }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
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
  logout: (name: string, data: unknown) => void
}
const props = defineProps<Props>()
</script>