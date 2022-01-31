<template>
  <div id="user-profile-account">
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
      <v-card flat>
        <v-card-title>
          UPDATE ACCOUNT DETAILS
          <v-spacer></v-spacer>
          <v-btn icon @click="toggleEditable()">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <v-row justify="center">
                <v-col cols="12" sm="6">
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
                      :disabled="!editable"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider
                    v-slot="{ errors }"
                    name="Username"
                    rules="required|max:10|min:5"
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
                      disabled
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
                      :disabled="!editable"
                    ></v-text-field>
                  </validation-provider>
                </v-col>
                <v-col cols="12" sm="6">
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
                      :disabled="!editable"
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
                      disabled
                    ></v-text-field>
                  </validation-provider>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-btn
                  :disabled="!editable || invalid"
                  :loading="updateLoading"
                  @click="updateProfile"
                >
                  Update
                </v-btn>
                <v-btn :disabled="!editable || invalid" @click="reset">
                  Reset
                </v-btn>
              </v-card-actions>
            </form>
          </validation-observer>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title> VERIFY EMAIL AND PHONE </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="user.email"
                autocomplete="off"
                label="E-mail *"
                outlined
                required
                dense
                disabled
              ></v-text-field>
              <v-text-field
                v-model="user.phone"
                autocomplete="off"
                :counter="10"
                label="Phone Number"
                outlined
                dense
                disabled
              ></v-text-field>
            </v-col>
            <v-card-actions>
              <v-col cols="12" sm="3">
                <div class="pb-6">
                  <v-btn
                    class="mr-4"
                    :disabled="user.emailVerified"
                    @click="verifyEmail()"
                    >Verify Email</v-btn
                  >
                </div>
                <div class="pb-6">
                  <v-btn
                    class="mr-4"
                    :disabled="user.phoneVerified"
                    @click="verifyPhone()"
                    >Verify Phone</v-btn
                  >
                </div>
              </v-col>
            </v-card-actions>
          </v-row>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>ACCOUNT STATS</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6"> Account Created At </v-col>
            <v-col cols="12" sm="6">
              {{ formatDateTime(user.createdAt) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6"> Account Last Updated At </v-col>
            <v-col cols="12" sm="6">
              {{ formatDateTime(user.updatedAt) }}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title>DELETE ACCOUNT</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="del.username"
                autocomplete="off"
                label="User Name *"
                outlined
                required
                dense
              ></v-text-field>
              <v-text-field
                v-model="del.email"
                autocomplete="off"
                label="E-mail *"
                outlined
                required
                dense
              ></v-text-field>
              <v-text-field
                v-model="del.password"
                autocomplete="off"
                label="Password *"
                outlined
                required
                :type="showPassword ? 'text' : 'password'"
                dense
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn :disabled="allowDelete()" color="error" @click="deleteUser()"
            >Delete User Account</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  required,
  digits,
  email,
  min,
  max,
  regex,
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
  message: "Email must be valid",
});

export default {
  name: "Account",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    user: {
      _id: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      emailVerified: true,
      phoneVerified: true,
      createdAt: "",
      updatedAt: "",
    },
    editable: false,
    del: {
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
    updateLoading: false,
  }),
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      _user: "auth/user",
    }),
  },
  mounted() {
    Object.assign(this.user, this._user);
  },
  methods: {
    ...mapActions({
      update: "auth/update",
      delete: "auth/delete",
    }),
    toggleEditable() {
      this.updateLoading = false;
      this.editable = !this.editable;
    },
    async submit() {
      await this.$refs.observer.validate();
    },
    reset() {
      Object.assign(this.user, this._user);
      this.$refs.observer.reset();
      this.toggleEditable();
    },
    allowDelete() {
      if (
        this.del &&
        this.del.username &&
        this.del.email &&
        this.del.password
      ) {
        return false;
      } else {
        return true;
      }
    },
    async updateProfile() {
      this.updateLoading = true;
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.update({ credentials: this.user, userType: "User" })
          .then(() => {
            this.snackbar.color = "success";
            this.snackbar.icon = "mdi-check-circle";
            this.snackbar.title = "Success";
            this.snackbar.text = "Update Successful";
            this.snackbar.active = true;
            this.toggleEditable();
          })
          .catch((error) => {
            this.snackbar.color = "error";
            this.snackbar.icon = "mdi-alert-circle";
            this.snackbar.title = "Error";
            this.snackbar.text = "Failed to Update";
            this.snackbar.active = true;
            this.toggleEditable();
          });
      }
    },
    deleteUser() {
      Object.assign(this.user, this.del);
      this.delete({ credentials: this.user, userType: "User" })
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    verifyEmail() {},
    verifyPhone() {},
    formatDateTime(dirtyDateTime) {
      if (dirtyDateTime) {
        const dirtyDateTimeArray = dirtyDateTime.split("T");
        const date = dirtyDateTimeArray[0];
        const time = dirtyDateTimeArray[1].split(".")[0];
        return `${date} ${time} UTC`;
      }
    },
    deactivateSnackar() {
      this.snackbar.active = false;
    },
  },
};
</script>
