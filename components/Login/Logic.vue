<template>
  <slot :submit="attemptLogin(api, useSnack(), navigateTo, useAuth().store)"></slot>
</template>