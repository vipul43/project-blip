<template>
  <v-card flat>
    <v-card-text> STATISTICS </v-card-text>
    <v-skeleton-loader
      v-bind="attrs"
      type="table-heading, list-item-two-line, image, table-tfoot"
    ></v-skeleton-loader>
  </v-card>
</template>

<script>
export default {
  name: "Statistics",
};
</script>
