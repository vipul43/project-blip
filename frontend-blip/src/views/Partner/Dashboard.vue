<template>
  <div id="partner-dashboard">
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
                  <v-card v-if="item.isAssigned" height="200">
                    <v-card-title class="text--h6">
                      Donor Details
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
                  <v-card v-else height="150">
                    <v-card-title class="text--h6">
                      Donor Details
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list>
                      <v-list-item>
                        <v-list-item-content class="text--h6">
                          Donor Not Yet Assigned
                        </v-list-item-content>
                      </v-list-item>
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
                <v-tooltip v-if="item.isPartnerArchived" bottom>
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
            <v-card-title>Add New Donation</v-card-title>
            <v-card-text>
              <validation-observer ref="observer" v-slot="{ invalid }">
                <form @submit.prevent="submit()">
                  <v-row justify="center">
                    <v-col sm="10">
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donor Name"
                        rules="required|max:20"
                      >
                        <v-text-field
                          v-model="track.donorName"
                          autocomplete="off"
                          :counter="20"
                          :error-messages="errors"
                          label="Donor Name *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donor Phone Number"
                        rules="digits:10|regex:^[0-9]{10}$"
                      >
                        <v-text-field
                          v-model="track.donorPhone"
                          autocomplete="off"
                          :counter="10"
                          :error-messages="errors"
                          label="Donor Phone Number *"
                          outlined
                          dense
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donor Email"
                        rules="required|email"
                      >
                        <v-text-field
                          v-model="track.donorEmail"
                          :error-messages="errors"
                          label="Donor E-mail *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donation Type"
                        rules="required"
                      >
                        <v-select
                          v-model="track.donationType"
                          :items="[
                            'Whole Blood',
                            'Power Red',
                            'Platelet',
                            'Plasma',
                          ]"
                          :error-messages="errors"
                          label="Donation Type *"
                          outlined
                          required
                          dense
                          clearable
                        ></v-select>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donor Quantity"
                        rules="required"
                      >
                        <v-text-field
                          v-model="track.donationQuantity"
                          autocomplete="off"
                          :error-messages="errors"
                          label="Donation Quantity *"
                          outlined
                          required
                          dense
                        ></v-text-field>
                      </validation-provider>
                      <validation-provider
                        v-slot="{ errors }"
                        name="Donor Description"
                        rules="required|max:50"
                      >
                        <v-textarea
                          v-model="track.donationDescription"
                          autocomplete="off"
                          :error-messages="errors"
                          label="Donation Description *"
                          outlined
                          required
                          dense
                        ></v-textarea>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <v-spacer></v-spacer>
                  <v-card-actions class="justify-end">
                    <v-btn @click="clear()"> Cancel </v-btn>
                    <v-btn :disabled="invalid" @click="saveDonation()">
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
  getPartnerDonation,
  addPartnerDonation,
  updatePartnerDonation,
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
  name: "PartnerDashboard",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Donation Id",
          value: "donationId",
        },
        {
          text: "Donor Name",
          value: "donorName",
        },
        {
          text: "Donor Phone",
          value: "donorPhone",
        },
        {
          text: "Donor Email",
          value: "donorEmail",
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
      showPassword: false,
      track: {
        donorName: "",
        donorPhone: "",
        donorEmail: "",
        donationType: "",
        donationQuantity: "",
        donationDescription: "",
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
      this.track.donorName = "";
      this.track.donorPhone = "";
      this.track.donorEmail = "";
      this.track.donationType = "";
      this.track.donationQuantity = "";
      this.track.donationDescription = "";
      this.$refs.observer.reset();
    },
    async getDonation() {
      this.tableLoading = true;
      getPartnerDonation(this.user._id, this.isArchived)
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
      addPartnerDonation(this.track, this.user._id)
        .then((response) => response.donation)
        .then(async () => {
          this.snackbar.color = "success";
          this.snackbar.icon = "mdi-check-circle";
          this.snackbar.title = "Success";
          this.snackbar.text = "Save Successful";
          this.snackbar.active = true;
          this.trackDialog = false;
          this.clear();
          await this.getDonation();
        })
        .catch((error) => {
          console.log(error);
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
      updatePartnerDonation(this.user._id, donation._id, {
        isPartnerArchived: true,
      })
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
      updatePartnerDonation(this.user._id, donation._id, {
        isPartnerArchived: false,
      })
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
        key: "First Name",
        value: item.firstName,
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
      title: "Partner Dashboard - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
