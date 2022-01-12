<template>
  <div id="dashboard">
    This is {{ authenticated ? username : "Unauthorized" }} Dashboard.
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      username: "auth/username",
    }),
  },
  metaInfo() {
    return {
      title: "Dashboard - Project BLiP",
    };
  },
};
</script>
