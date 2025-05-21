<template>
  <slot :submit="attemptLogin(endpoints.sessions.new, useSnack(), navigateTo, useAuth().store)"></slot>
</template>