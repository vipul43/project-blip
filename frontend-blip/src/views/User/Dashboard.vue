<template>
  <div id="user-dashboard">
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-btn id="btn" to="/donate-blood" x-large depressed dark
            >Donate Blood</v-btn
          >
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn id="btn" to="/track-blood" x-large depressed dark
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
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="donationDetails"
              :search="search"
            >
              <template #[`item.type`]="{ item }">
                <v-chip :key="item.type">{{ item.type }}</v-chip>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="trackItem(item)">
                      mdi-map-marker-account
                    </v-icon>
                  </template>
                  <span>Track</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="deleteItem(item)">
                      mdi-delete
                    </v-icon>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on" @click="reportItem(item)">
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
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserDashboard",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Type",
          value: "type",
        },
        {
          text: "Quantity",
          value: "quantity",
          filterable: false,
        },
        {
          text: "#Souls Saved",
          value: "doneeCount",
          filterable: false,
        },
        {
          text: "Actions",
          value: "actions",
          filterable: false,
          sortable: false,
        },
      ],
      donationDetails: [
        {
          name: "First Donation",
          type: "Whole Blood",
          quantity: "300ml",
          doneeCount: "0",
        },
        {
          name: "Second Donation",
          type: "Power Red",
          quantity: "100ml",
          doneeCount: "2",
        },
        {
          name: "Third Donation",
          type: "Platelet",
          quantity: "4000",
          doneeCount: "1",
        },
        {
          name: "Fourth Donation",
          type: "Plasma",
          quantity: "100ml",
          doneeCount: "1",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      authenticated: "auth/authenticated",
      user: "auth/user",
    }),
  },
  metaInfo() {
    return {
      title: "Dashboard - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
