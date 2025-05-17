<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack(), navigateTo)"></slot>
</template>