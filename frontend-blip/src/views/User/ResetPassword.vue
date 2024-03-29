<template>
  <div id="user-reset-password">
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
      <v-row justify="center">
        <v-col sm="2"
          ><v-img
            src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.svg"
          ></v-img>
        </v-col>
      </v-row>

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit()">
          <v-row justify="center">
            <v-col sm="3">
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required"
              >
                <v-text-field
                  v-model="user.username"
                  autocomplete="username"
                  :error-messages="errors"
                  label="User Name *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <v-text-field
                  v-model="user.email"
                  :error-messages="errors"
                  label="E-mail *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="New Password"
                rules="required"
              >
                <v-text-field
                  v-model="user.password"
                  :error-messages="errors"
                  label="New Password *"
                  outlined
                  required
                  :type="showPassword ? 'text' : 'password'"
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
            :loading="resetPasswordLoading"
            @click="resetPassword"
          >
            Reset Password
          </v-btn>
          <v-btn @click="clear"> Clear </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </div>
</template>

<script>
import { resetPasswordUser } from "../../api.js";
import { required, email } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});
extend("email", {
  ...email,
  message: "{_field_} must be valid",
});

export default {
  name: "UserResetPassword",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    user: {
      username: "",
      email: "",
      password: "",
    },
    snackbar: {
      active: false,
      color: "",
      icon: "",
      timeout: 3000,
      top: "true",
      title: "",
      text: "",
    },
    showPassword: false,
    resetPasswordLoading: false,
  }),
  methods: {
    async resetPassword() {
      this.resetPasswordLoading = true;
      const valid = await this.$refs.observer.validate();
      if (valid) {
        resetPasswordUser(this.$route.query.token, this.user)
          .then(() => {
            this.resetPasswordLoading = false;
            this.snackbar.color = "success";
            this.snackbar.icon = "mdi-check-circle";
            this.snackbar.title = "Success";
            this.snackbar.text = "Password Reset Successful";
            this.snackbar.active = true;
            this.$router.replace({
              name: "UserLogIn",
            });
          })
          .catch((error) => {
            this.resetPasswordLoading = false;
            this.snackbar.color = "error";
            this.snackbar.icon = "mdi-alert-circle";
            this.snackbar.title = "Error";
            this.snackbar.text = "Failed to Reset Password";
            this.snackbar.active = true;
          });
      }
    },
    async submit() {
      await this.$refs.observer.validate();
    },
    clear() {
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.$refs.observer.reset();
    },
    deactivateSnackar() {
      this.snackbar.active = false;
    },
  },
  metaInfo() {
    return {
      title: "User Reset Password | Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
