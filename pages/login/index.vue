<template>
  <login-logic #default="slotProps">
    <login-form @submit="slotProps.submit" />
  </login-logic>
</template>