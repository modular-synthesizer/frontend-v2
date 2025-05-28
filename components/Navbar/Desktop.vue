<template>
  <v-app-bar color="deep-purple darken-2" v-if="authenticated">
    <template v-slot:prepend>
      <v-app-bar-title class="ml-2 mr-1">{{ $t('common.brand') }}</v-app-bar-title>
      <v-btn icon to="/" aria-label="home link" class="ml-1">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn variant="text" to="/synthesizers" class="ml-2">{{ $t('menu.synthesizers') }}</v-btn>
    </template>
    <template v-slot:append>
      <v-btn aria-label="logout link" @click="logout()">{{ $t('common.verbs.logout') }}</v-btn>
    </template>
  </v-app-bar>
  <v-app-bar color="deep-purple darken-2" v-else>
    <template v-slot:prepend>
      <v-app-bar-title class="mr-2">{{ $t('common.brand') }}</v-app-bar-title>
      <v-btn icon to="/" aria-label="home link"><v-icon>mdi-home</v-icon></v-btn>
    </template>
    <template v-slot:append>
      <v-btn to="/login" aria-label="login link">{{ $t('common.verbs.login') }}</v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
type Props = {
  authenticated: boolean
  logout: () => void
}
const props = defineProps<Props>()
</script>