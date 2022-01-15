<template>
  <div id="partner-sign-up">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="2"
          ><v-img
            src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.png"
          ></v-img>
        </v-col>
      </v-row>

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Partner Name"
                rules="required|max:20"
              >
                <v-text-field
                  v-model="partner.partnerName"
                  autocomplete="username"
                  :counter="20"
                  :error-messages="errors"
                  label="Partner Name *"
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
                  v-model="partner.email"
                  autocomplete="off"
                  :error-messages="errors"
                  label="E-mail *"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Phone Number"
                rules="digits:10|regex:^[0-9]{10}$"
              >
                <v-text-field
                  v-model="partner.phone"
                  autocomplete="off"
                  :counter="10"
                  :error-messages="errors"
                  label="Phone Number *"
                  outlined
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Type"
                rules="required"
              >
                <v-select
                  v-model="partner.type"
                  :items="['Donation Center', 'Hospital']"
                  :error-messages="errors"
                  label="Type *"
                  outlined
                  required
                ></v-select>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Houseno"
                rules="required|max:10"
              >
                <v-text-field
                  v-model="partner.address.houseno"
                  autocomplete="off"
                  :counter="10"
                  :error-messages="errors"
                  label="House No *"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Landmark"
                rules="max:50"
              >
                <v-text-field
                  v-model="partner.address.landmark"
                  autocomplete="off"
                  :counter="50"
                  :error-messages="errors"
                  label="Landmark"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="8">
              <validation-provider
                v-slot="{ errors }"
                name="Area and Street"
                rules="required|max:100|min:10"
              >
                <v-text-field
                  v-model="partner.address.area_and_street"
                  autocomplete="off"
                  :counter="100"
                  :error-messages="errors"
                  label="Area and Street *"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Country"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.country"
                  autocomplete="off"
                  :items="countries"
                  :error-messages="errors"
                  label="Country *"
                  outlined
                  required
                  disabled
                ></v-autocomplete>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="State"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.state"
                  autocomplete="off"
                  :items="states"
                  :error-messages="errors"
                  label="State *"
                  outlined
                  required
                ></v-autocomplete>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Pincode"
                rules="required|digits:6"
              >
                <v-text-field
                  v-model="partner.address.pincode"
                  autocomplete="off"
                  :counter="6"
                  :error-messages="errors"
                  label="Pincode *"
                  outlined
                  required
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="City/Town/District"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.city_town_district"
                  autocomplete="off"
                  :items="cities_towns_districts"
                  :error-messages="errors"
                  label="City/Town/District *"
                  outlined
                  required
                ></v-autocomplete>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" sm="4">
              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required|max:12|min:8"
              >
                <v-text-field
                  v-model="partner.password"
                  autocomplete="off"
                  :counter="12"
                  :error-messages="errors"
                  label="Password *"
                  outlined
                  required
                  type="password"
                ></v-text-field>
              </validation-provider>
            </v-col>
          </v-row>

          <v-btn class="mr-4" type="submit" :disabled="invalid" @click="signUp">
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
  message: "{_field_} needs to be {length} digits. ({_value_}) is invalid.",
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
  name: "PartnerSignUp",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    partner: {
      partnerName: "",
      email: "",
      phone: "",
      type: "Donation Center",
      address: {
        houseno: "",
        area_and_street: "",
        landmark: "",
        country: "India",
        state: "",
        pincode: "",
        city_town_district: "",
      },
      password: "",
    },
  }),
  methods: {
    ...mapActions({
      register: "auth/register",
    }),
    async signUp() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.register({ credentials: this.partner, userType: "Partner" })
          .then(() => {
            this.$router.replace({
              name: "PartnerDashboard",
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
      this.partner.partnerName = "";
      this.partner.email = "";
      this.partner.phone = "";
      this.partner.type = "Donation Center";
      this.partner.address = {
        houseno: "",
        area_and_street: "",
        landmark: "",
        country: "India",
        state: "",
        pincode: "",
        city_town_district: "",
      };
      this.partner.password = "";
      this.$refs.observer.reset();
    },
  },
  computed: {
    countries() {
      return [
        "India",
        "Pakistan",
        "Sri Lanka",
        "Indonesia",
        "Burma",
        "Bangladesh",
        "Myanmar",
      ];
    },
    states() {
      return [
        "Telangana",
        "Kerala",
        "Maharashtra",
        "Madhya Pradesh",
        "Uttar Pradesh",
      ];
    },
    cities_towns_districts() {
      return [
        "Warangal",
        "Palakkad",
        "Coimnbatore",
        "Vishakapatnam",
        "Vijaywada",
      ];
    },
  },
  metaInfo() {
    return {
      title: "Partner Sign Up - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
