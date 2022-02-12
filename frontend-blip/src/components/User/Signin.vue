<template>
  <div id="user-sign-in">
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
                name="Password"
                rules="required"
              >
                <v-text-field
                  v-model="user.password"
                  :error-messages="errors"
                  label="Password *"
                  outlined
                  required
                  :type="showPassword ? 'text' : 'password'"
                  dense
                >
                  <template slot="append">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="showPassword = !showPassword"
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                        </v-icon>
                      </template>
                      {{ showPassword ? "Hide password" : "Show password" }}
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          @click="resetDialog = true"
                          v-bind="attrs"
                          v-on="on"
                        >
                          mdi-lock-question
                        </v-icon>
                      </template>
                      Forgot Password?
                    </v-tooltip>
                  </template>
                </v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
            :loading="signInLoading"
            @click="signIn"
          >
            Sign In
          </v-btn>
          <v-btn @click="signInClear"> Clear </v-btn>
        </form>
      </validation-observer>
      <v-dialog v-model="resetDialog" persistent max-width="500">
        <v-card>
          <v-container>
            <v-card-title class="text-h5">Reset Password</v-card-title>
            <v-card-subtitle class="pa-2">
              Enter registered username, email and click on Reset Password to
              recieve the reset link to your mailbox.
            </v-card-subtitle>
            <v-card-text class="pa-2">
              <validation-observer ref="observer2" v-slot="{ invalid }">
                <form @submit.prevent="submit()">
                  <v-row justify="center">
                    <v-col sm="10">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Username"
                        rules="required"
                      >
                        <v-text-field
                          v-model="reset.username"
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
                          v-model="reset.email"
                          :error-messages="errors"
                          label="E-mail *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-card-actions class="justify-end">
                    <v-btn @click="resetClear"> Cancel </v-btn>
                    <v-btn
                      :disabled="invalid"
                      :loading="resetLoading"
                      @click="resetPassword"
                    >
                      Reset Password
                    </v-btn>
                  </v-card-actions>
                </form>
              </validation-observer>
            </v-card-text>
          </v-container>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  name: "UserSignIn",
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
    signInLoading: false,
    resetDialog: false,
    reset: {
      username: "",
      email: "",
    },
    resetLoading: false,
  }),
  methods: {
    ...mapActions({
      validate: "auth/validate",
    }),
    async signIn() {
      this.signInLoading = true;
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.validate({ credentials: this.user, userType: "User" })
          .then(() => {
            this.signInLoading = false;
            this.$router.replace({
              name: "UserDashboard",
            });
          })
          .catch((error) => {
            this.signInLoading = false;
            this.snackbar.color = "error";
            this.snackbar.icon = "mdi-alert-circle";
            this.snackbar.title = "Error";
            this.snackbar.text = "Failed to Sign In";
            this.snackbar.active = true;
          });
      }
    },
    async submit() {
      await this.$refs.observer.validate();
    },
    signInClear() {
      this.user.username = "";
      this.user.email = "";
      this.user.password = "";
      this.$refs.observer.reset();
    },
    async resetPassword() {
      this.resetLoading = true;
      const valid = await this.$refs.observer2.validate();
    },
    resetClear() {
      this.resetDialog = false;
      this.reset.username = "";
      this.reset.email = "";
      this.$refs.observer2.reset();
    },
    deactivateSnackar() {
      this.snackbar.active = false;
    },
  },
  metaInfo() {
    return {
      title: "User Sign In - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
