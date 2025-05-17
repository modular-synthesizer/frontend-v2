<template>
  <v-container fluid>
    <v-row>
      <v-col col="12" md="6" offset-md="3" xl="4" offset-xl="4">
        <login-logic #default="slotProps">
          <login-form @submit="slotProps.submit" />
        </login-logic>
      </v-col>
    </v-row>
  </v-container>
</template>