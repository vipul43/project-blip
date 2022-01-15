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
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required|max:10|min:5"
              >
                <v-text-field
                  v-model="user.username"
                  :error-messages="errors"
                  label="User Name *"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
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
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="4">
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
import { required, email, min, max } from "vee-validate/dist/rules";
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
extend("min", {
  ...min,
  message: "{_field_} may not be less than {length} characters",
});
extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
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
      username: "",
      email: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions({
      validate: "auth/validate",
    }),
    async signIn() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.validate(this.user)
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
