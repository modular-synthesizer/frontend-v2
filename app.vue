<template>
  <v-app>
    <v-layout>
      <NuxtLayout>
        <NuxtPage />
        <ClientOnly><SnackQueue /></ClientOnly>
      </NuxtLayout>
    </v-layout>
  </v-app>
</template>

<style>
html { overflow: auto; }
</style>