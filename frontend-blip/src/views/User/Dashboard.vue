<template>
  <div id="user-dashboard">
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
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn id="btn" to="/donate-blood" x-large depressed dark
            >Donate Blood</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn id="btn" @click="trackDialog = true" x-large depressed dark
            >Track Blood</v-btn
          >
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
              ></v-text-field>
              <v-switch
                class="ml-4"
                v-model="isArchived"
                inset
                label="View Archived"
              ></v-switch>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="donationDetails"
              :search="search"
              :loading="tableLoading"
              mobile-breakpoint
            >
              <template #[`item.donationId`]="{ item }">
                <v-menu open-on-hover transition="scale-y-transition">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on">
                      {{ item._id }}
                    </v-btn>
                  </template>
                  <v-card height="200">
                    <v-card-title class="text--h6">
                      Donation Center Details
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                      <template v-for="(ob, index) in getItems(item)">
                        <div style="max-width: 400px" :key="index">
                          <tbody>
                            <tr>
                              <td style="width: 200px">
                                <b>{{ ob.key }}: </b>
                              </td>
                              <td>{{ ob.value }}</td>
                            </tr>
                          </tbody>
                        </div>
                      </template>
                    </v-list>
                  </v-card>
                </v-menu>
              </template>
              <template #[`item.donationType`]="{ item }">
                <v-chip :key="item.donationType">{{
                  item.donationType
                }}</v-chip>
              </template>
              <template #[`item.donationStatus`]="{ item }">
                <v-chip :key="item.donationStatus">{{
                  item.donationStatus
                }}</v-chip>
              </template>
              <template #[`item.donationDate`]="{ item }"
                >{{ formatDateTime(item.createdAt) }}
              </template>
              <template #[`item.actions`]="{ item }">
                <v-tooltip v-if="item.isUserArchived" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      @click="unarchiveDonation(item)"
                    >
                      mdi-archive-arrow-down
                    </v-icon>
                  </template>
                  <span>Unarchive</span>
                </v-tooltip>
                <v-tooltip v-else bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      @click="archiveDonation(item)"
                    >
                      mdi-archive-arrow-up
                    </v-icon>
                  </template>
                  <span>Archive</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      @click="reportDonation(item)"
                    >
                      mdi-alert-octagon
                    </v-icon>
                  </template>
                  <span>Report</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-col></v-row
      >
      <v-dialog v-model="trackDialog" persistent max-width="500">
        <v-card>
          <v-container>
            <v-card-title class="text-h5">Add New Donation</v-card-title>
            <v-card-text>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit()">
                  <v-row justify="center">
                    <v-col sm="10">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donoation Id"
                        rules="required"
                      >
                        <v-text-field
                          v-model="track.donationId"
                          autocomplete="off"
                          :error-messages="errors"
                          label="Donation Id *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donation Name"
                        rules="required|max:20"
                      >
                        <v-text-field
                          v-model="track.donationName"
                          autocomplete="off"
                          :counter="20"
                          :error-messages="errors"
                          label="Donation Name *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-card-actions class="justify-end">
                    <v-btn @click="clear()"> Cancel </v-btn>
                    <v-btn
                      :disabled="invalid"
                      :loading="saveLoading"
                      @click="saveDonation()"
                    >
                      Save
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
import { mapGetters } from "vuex";
import {
  getUserDonation,
  addUserDonation,
  updateUserDonation,
} from "../../api.js";
import { required, digits, email, max, regex } from "vee-validate/dist/rules";
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

export default {
  name: "UserDashboard",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Donation Id",
          value: "donationId",
          sortable: false,
        },
        {
          text: "Donation Name",
          value: "donationName",
        },
        {
          text: "Donation Type",
          value: "donationType",
        },
        {
          text: "Donation Quantity",
          value: "donationQuantity",
        },
        {
          text: "Donation Description",
          value: "donationDescription",
          align: " d-none",
        },
        {
          text: "Donation Status",
          value: "donationStatus",
        },
        {
          text: "Donation Date (UTC)",
          value: "donationDate",
        },
        {
          text: "#Souls Saved",
          value: "soulsSaved",
        },
        {
          text: "Actions",
          value: "actions",
          filterable: false,
          sortable: false,
          width: "80",
        },
      ],
      donationDetails: [],
      tableLoading: true,
      trackDialog: false,
      track: {
        donationId: "",
        donationName: "",
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
      isArchived: false,
      saveLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  methods: {
    formatDateTime(dateTime) {
      if (dateTime) {
        const dateTimeArray = dateTime.split("T");
        const date = dateTimeArray[0];
        const timeArray = dateTimeArray[1].split(".");
        const time = timeArray[0];
        return `${date} ${time}`;
      } else {
        return ``;
      }
    },
    async submit() {
      await this.$refs.observer.validate();
    },
    clear() {
      this.saveLoading = false;
      this.trackDialog = false;
      this.track.donationId = "";
      this.track.donationName = "";
      this.$refs.observer.reset();
    },
    async getDonation() {
      this.tableLoading = true;
      getUserDonation(this.user._id, this.isArchived)
        .then((response) => response.donations)
        .then((donations) => {
          this.donationDetails = donations;
          this.tableLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async saveDonation() {
      this.saveLoading = true;
      addUserDonation(this.track, this.user._id)
        .then((response) => response.donation)
        .then(async () => {
          this.snackbar.color = "success";
          this.snackbar.icon = "mdi-check-circle";
          this.snackbar.title = "Success";
          this.snackbar.text = "Save Successful";
          this.snackbar.active = true;
          this.clear();
          await this.getDonation();
        })
        .catch((error) => {
          console.log(error);
          this.saveLoading = false;
          this.snackbar.color = "error";
          this.snackbar.icon = "mdi-alert-circle";
          this.snackbar.title = "Error";
          this.snackbar.text = "Failed to Save";
          this.snackbar.active = true;
        });
    },
    deactivateSnackar() {
      this.snackbar.active = false;
    },
    async archiveDonation(donation) {
      updateUserDonation(this.user._id, donation._id, { isUserArchived: true })
        .then((response) => response.donation)
        .then(async () => {
          this.snackbar.color = "success";
          this.snackbar.icon = "mdi-check-circle";
          this.snackbar.title = "Success";
          this.snackbar.text = "Archive Successful";
          this.snackbar.active = true;
          await this.getDonation();
        })
        .catch((error) => {
          console.log(error);
          this.snackbar.color = "error";
          this.snackbar.icon = "mdi-alert-circle";
          this.snackbar.title = "Error";
          this.snackbar.text = "Failed to Archive";
          this.snackbar.active = true;
        });
    },
    async unarchiveDonation(donation) {
      updateUserDonation(this.user._id, donation._id, { isUserArchived: false })
        .then((response) => response.donation)
        .then(async () => {
          this.snackbar.color = "success";
          this.snackbar.icon = "mdi-check-circle";
          this.snackbar.title = "Success";
          this.snackbar.text = "Unarchive Successful";
          this.snackbar.active = true;
          await this.getDonation();
        })
        .catch((error) => {
          console.log(error);
          this.snackbar.color = "error";
          this.snackbar.icon = "mdi-alert-circle";
          this.snackbar.title = "Error";
          this.snackbar.text = "Failed to Unarchive";
          this.snackbar.active = true;
        });
    },
    async reportDonation(donation) {
      console.log(donation.donationName);
    },
    getItems(item) {
      let i = 0;
      const ret = [];
      ret.push({
        key: "Name",
        value: item.orgName,
        index: (i += 1),
      });
      ret.push({
        key: "Email",
        value: item.email,
        index: (i += 1),
      });
      ret.push({
        key: "Phone",
        value: item.phone,
        index: (i += 1),
      });
      ret.push({
        key: "HouseNo",
        value: item.address.houseno,
        index: (i += 1),
      });
      ret.push({
        key: "Area And Street",
        value: item.address.area_and_street,
        index: (i += 1),
      });
      ret.push({
        key: "City/Town/District",
        value: item.address.city_town_district,
        index: (i += 1),
      });
      ret.push({
        key: "Pincode",
        value: item.address.pincode,
        index: (i += 1),
      });
      ret.push({
        key: "State",
        value: item.address.state,
        index: (i += 1),
      });
      ret.push({
        key: "Country",
        value: item.address.country,
        index: (i += 1),
      });
      ret.push({
        key: "Donor Name",
        value: item.donorName,
        index: (i += 1),
      });
      ret.push({
        key: "Donor Email",
        value: item.donorEmail,
        index: (i += 1),
      });
      ret.push({
        key: "Donor Phone",
        value: item.donorPhone,
        index: (i += 1),
      });
      ret.push({
        key: "Donation Description",
        value: item.donationDescription,
        index: (i += 1),
      });
      return ret;
    },
  },
  async mounted() {
    await this.getDonation();
  },
  watch: {
    isArchived: {
      async handler() {
        await this.getDonation();
      },
      immediate: true,
    },
  },
  metaInfo() {
    return {
      title: "Dashboard | Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
