<template>
  <slot :submit="attemptLogin(api.sessions.new)"></slot>
</template>