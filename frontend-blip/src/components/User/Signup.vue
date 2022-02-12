<template>
  <div id="user-sign-up">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="2"
          ><v-img
            src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.svg"
          ></v-img>
        </v-col>
      </v-row>

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <v-row justify="center">
            <v-col cols="12" sm="3">
              <validation-provider
                v-slot="{ errors }"
                name="First Name"
                rules="required|max:20"
              >
                <v-text-field
                  v-model="user.firstName"
                  autocomplete="off"
                  :counter="20"
                  :error-messages="errors"
                  label="First Name *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required|max:10|min:5|alpha_dash"
              >
                <v-text-field
                  v-model="user.username"
                  autocomplete="username"
                  :counter="10"
                  :error-messages="errors"
                  label="User Name *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Phone Number"
                rules="digits:10|regex:^[0-9]{10}$"
              >
                <v-text-field
                  v-model="user.phone"
                  autocomplete="off"
                  :counter="10"
                  :error-messages="errors"
                  label="Phone Number"
                  outlined
                  dense
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="3">
              <validation-provider
                v-slot="{ errors }"
                name="Last Name"
                rules="max:20"
              >
                <v-text-field
                  v-model="user.lastName"
                  autocomplete="off"
                  :counter="20"
                  :error-messages="errors"
                  label="Last Name"
                  outlined
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
                  autocomplete="off"
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
                rules="required|max:12|min:8"
              >
                <v-text-field
                  v-model="user.password"
                  autocomplete="off"
                  :counter="12"
                  :error-messages="errors"
                  label="Password *"
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
            :loading="signUpLoading"
            @click="signUp"
          >
            Sign Up
          </v-btn>
          <v-btn @click="clear"> Clear </v-btn>
        </form>
      </validation-observer>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  required,
  digits,
  email,
  min,
  max,
  regex,
  alpha_dash,
} from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("digits", {
  ...digits,
  message: "{_field_} needs to be {length} digits. ({_value_})",
});
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
extend("regex", {
  ...regex,
  message: "{_field_} {_value_} does not match {regex}",
});
extend("email", {
  ...email,
  message: "{_field_} must be valid",
});
extend("alpha_dash", {
  ...alpha_dash,
  message: "{_field_} can not have spaces",
});

export default {
  name: "UserSignUp",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    user: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      password: "",
    },
    showPassword: false,
    signUpLoading: false,
  }),
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    async signUp() {
      this.signUpLoading = true;
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.register({ credentials: this.user, userType: "User" })
          .then(() => {
            this.signUpLoading = false;
            this.$router.replace({
              name: "UserDashboard",
            });
          })
          .catch((error) => {
            this.signUpLoading = false;
            console.log(error);
            //raise error alert
          });
      }
    },
    async submit() {
      await this.$refs.observer.validate();
    },
    clear() {
      this.user.firstName = "";
      this.user.lastName = "";
      this.user.username = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.password = "";
      this.$refs.observer.reset();
    },
  },
  metaInfo() {
    return {
      title: "User Sign Up - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
