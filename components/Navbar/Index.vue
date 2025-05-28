<template>
  <navbar-logic #default="{ authenticated, logout, mobile }">
    <navbar-mobile v-if="mobile" :authenticated :logout />
    <navbar-desktop v-else :authenticated :logout />
  </navbar-logic>
</template>