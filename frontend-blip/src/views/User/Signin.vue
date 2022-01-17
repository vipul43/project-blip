<template>
  <div id="user-sign-in">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="2"
          ><v-img
            src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.png"
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
                  type="password"
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-btn class="mr-4" type="submit" :disabled="invalid" @click="signIn">
            Sign In
          </v-btn>
          <v-btn @click="clear"> Clear </v-btn>
        </form>
      </validation-observer>
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
  message: "Email must be valid",
});

export default {
  name: "UserSignIn",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    user: {
      username: "vipul43",
      email: "sfdc@gmail.com",
      password: "12345678",
    },
  }),
  methods: {
    ...mapActions({
      validate: "auth/validate",
    }),
    async signIn() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.validate({ credentials: this.user, userType: "User" })
          .then(() => {
            this.$router.replace({
              name: "UserDashboard",
            });
          })
          .catch((error) => {
            console.log(error);
            //raise error alert
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
