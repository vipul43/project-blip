<template>
  <div id="partner-sign-up">
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
                name="Organisation Name"
                rules="required|max:50|min:10"
              >
                <v-text-field
                  v-model="partner.orgName"
                  :counter="50"
                  :error-messages="errors"
                  label="Organisation Name *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Phone Number"
                rules="digits:10|required|regex:^[0-9]{10}$"
              >
                <v-text-field
                  v-model="partner.phone"
                  autocomplete="off"
                  :counter="10"
                  :error-messages="errors"
                  label="Phone Number *"
                  outlined
                  required
                  dense
                ></v-text-field>
              </validation-provider>
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
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="State"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.state"
                  autocomplete="off"
                  :items="states"
                  item-text="name"
                  item-value="iso2"
                  :error-messages="errors"
                  label="State *"
                  outlined
                  required
                  dense
                  :disabled="partner.address.country === ''"
                ></v-autocomplete>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="3">
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required|max:10|min:5|alpha_dash"
              >
                <v-text-field
                  v-model="partner.username"
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
                  dense
                ></v-select>
              </validation-provider>
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
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="City/Town/District"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.city_town_district"
                  autocomplete="off"
                  :items="cities_towns_districts"
                  item-text="name"
                  item-value="iso2"
                  :error-messages="errors"
                  label="City/Town/District *"
                  outlined
                  required
                  dense
                  :disabled="partner.address.state === ''"
                ></v-autocomplete>
              </validation-provider>
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
                  :type="showPassword ? 'text' : 'password'"
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </validation-provider>
            </v-col>
            <v-col cols="12" sm="3">
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
                  dense
                ></v-text-field>
              </validation-provider>
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
                  dense
                ></v-text-field>
              </validation-provider>
              <validation-provider
                v-slot="{ errors }"
                name="Country"
                rules="required"
              >
                <v-autocomplete
                  v-model="partner.address.country"
                  autocomplete="off"
                  :items="countries"
                  item-text="name"
                  item-value="iso2"
                  :error-messages="errors"
                  label="Country *"
                  outlined
                  required
                  dense
                ></v-autocomplete>
              </validation-provider>
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
                  dense
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
import {
  getAllCountries,
  getStatesByCountry,
  getCitiesByStateAndCountry,
} from "../../api.js";

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
  message: "{_field_} must be valid",
});
extend("alpha_dash", {
  ...alpha_dash,
  message: "{_field_} can not have spaces",
});

export default {
  name: "PartnerSignUp",
  components: { ValidationProvider, ValidationObserver },
  data: () => ({
    partner: {
      orgName: "",
      username: "",
      email: "",
      phone: "",
      type: "Donation Center",
      address: {
        houseno: "",
        area_and_street: "",
        landmark: "",
        country: "IN",
        state: "",
        pincode: "",
        city_town_district: "",
      },
      password: "",
    },
    countries: [],
    states: [],
    cities_towns_districts: [],
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
        this.register({ credentials: this.partner, userType: "Partner" })
          .then(() => {
            this.signUpLoading = false;
            this.$router.replace({
              name: "PartnerDashboard",
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
      this.partner.orgName = "";
      this.partner.username = "";
      this.partner.email = "";
      this.partner.phone = "";
      this.partner.type = "Donation Center";
      this.partner.address = {
        houseno: "",
        area_and_street: "",
        landmark: "",
        country: "IN",
        state: "",
        pincode: "",
        city_town_district: "",
      };
      this.partner.password = "";
      this.$refs.observer.reset();
    },
    async getCountries() {
      const countriesResponse = await getAllCountries();
      this.countries = countriesResponse;
    },
    async getStates(ciso) {
      const statesResponse = await getStatesByCountry(ciso);
      this.states = statesResponse;
    },
    async getCities(ciso, siso) {
      const citiesResponse = await getCitiesByStateAndCountry(ciso, siso);
      this.cities_towns_districts = citiesResponse;
    },
  },
  watch: {
    partner: {
      async handler(partner) {
        if (partner.address.country != "") {
          await this.getStates(partner.address.country);
        }
        if (partner.address.state != "") {
          await this.getCities(partner.address.country, partner.address.state);
        }
      },
      deep: true,
    },
  },
  async created() {
    await this.getCountries();
    await this.getStates(this.partner.address.country);
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
