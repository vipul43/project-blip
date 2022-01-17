<template>
  <v-card flat>
    <v-card-text> SHARE </v-card-text>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar-three-line, image, article"
    ></v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  name: "Share",
};
</script>
