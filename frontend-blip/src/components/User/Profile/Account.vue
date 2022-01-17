<template>
  <v-card flat>
    <v-card-text> ACCOUNT </v-card-text>
    <v-skeleton-loader
      v-bind="attrs"
      type="card-avatar, article, actions"
    ></v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  name: "Account",
};
</script>
