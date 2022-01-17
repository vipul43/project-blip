<template>
  <v-card flat>
    <v-card-text> SECURITY </v-card-text>
    <v-skeleton-loader
      v-bind="attrs"
      type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
    ></v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  name: "Security",
};
</script>
