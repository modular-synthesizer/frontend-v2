<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack())"></slot>
</template>