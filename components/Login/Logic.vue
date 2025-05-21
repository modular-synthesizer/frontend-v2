<template>
  <slot :submit="attemptLogin(api.sessions.new, useSnack(), navigateTo, useAuth().store)"></slot>
</template>

<script setup lang="ts">
import { attemptLogin } from "~/core/features/sessions/attemptLogin"
import { api } from "~/core/api"
</script>