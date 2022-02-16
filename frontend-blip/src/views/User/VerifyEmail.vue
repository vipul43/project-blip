<template>
  <div id="user-verify-email">
    <v-snackbar
      v-model="snackbar.active"
      :color="snackbar.color"
      timeout="4000"
      :top="true"
    >
      <v-layout align-center pr-4>
        <v-icon class="pr-3" dark large>{{ snackbar.icon }}</v-icon>
        <v-layout column>
          <div>
            <strong>{{ snackbar.title }}</strong>
          </div>
          <div>{{ snackbar.text }}</div>
        </v-layout>
      </v-layout>

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="deactivateSnackar()"> Close </v-btn>
      </template>
    </v-snackbar>
    <v-container>
      {{ status }}
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { verifyEmailUser } from "../../api.js";

export default {
  name: "UserVerifyEmail",
  data: () => ({
    status: "Verifying Email...",
    snackbar: {
      active: false,
      color: "",
      icon: "",
      timeout: 3000,
      top: "true",
      title: "",
      text: "",
    },
  }),
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  async mounted() {
    verifyEmailUser(this.$route.query.token, this.user)
      .then(() => {
        this.snackbar.color = "success";
        this.snackbar.icon = "mdi-check-circle";
        this.snackbar.title = "Success";
        this.snackbar.text = "Successfully verified email";
        this.status = `Email Verification Successful. This window closes in 5s`;
        this.snackbar.active = true;
        setTimeout(() => {
          window.close();
        }, 5000);
      })
      .catch((error) => {
        this.snackbar.color = "error";
        this.snackbar.icon = "mdi-alert-circle";
        this.snackbar.title = "Error";
        this.snackbar.text = "Failed to verify email. This window closes in 5s";
        this.snackbar.active = true;
        setTimeout(function () {
          window.close();
        }, 5000);
      });
  },
  metaInfo() {
    return {
      title: "User Verify Email - Project BLiP",
    };
  },
};
</script>
