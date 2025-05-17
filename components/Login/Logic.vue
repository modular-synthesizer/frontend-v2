<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack(), navigateTo, useAuth().store)"></slot>
</template>