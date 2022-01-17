<template>
  <div id="user-profile">
    <v-container>
      <v-card>
        <v-tabs vertical grow :height="400">
          <v-tab>
            <v-icon left> mdi-account </v-icon>
            Account
          </v-tab>
          <v-tab>
            <v-icon left> mdi-share-variant </v-icon>
            Share
          </v-tab>
          <v-tab>
            <v-icon left> mdi-timer </v-icon>
            Timer
          </v-tab>
          <v-tab>
            <v-icon left> mdi-chart-timeline-variant-shimmer </v-icon>
            Statistics
          </v-tab>
          <v-tab>
            <v-icon left> mdi-lock </v-icon>
            Security
          </v-tab>
          <v-tab>
            <v-icon left> mdi-gift </v-icon>
            Rewards
          </v-tab>

          <v-tab-item>
            <Account></Account>
          </v-tab-item>
          <v-tab-item>
            <Share></Share>
          </v-tab-item>
          <v-tab-item>
            <Timer></Timer>
          </v-tab-item>
          <v-tab-item>
            <Statistics></Statistics>
          </v-tab-item>
          <v-tab-item>
            <Security></Security>
          </v-tab-item>
          <v-tab-item>
            <Rewards></Rewards>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Account from "../../components/User/Profile/Account.vue";
import Share from "../../components/User/Profile/Share.vue";
import Timer from "../../components/User/Profile/Timer.vue";
import Statistics from "../../components/User/Profile/Statistics.vue";
import Security from "../../components/User/Profile/Security.vue";
import Rewards from "../../components/User/Profile/Rewards.vue";

export default {
  name: "UserProfile",
  components: {
    Account,
    Share,
    Timer,
    Statistics,
    Security,
    Rewards,
  },
  methods: {
    getProfileName() {
      if (this.user) {
        if (this.user.lastName) {
          return `${this.user.firstName} ${this.user.lastName}`;
        } else {
          return `${this.user.firstName}`;
        }
      }
    },
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  metaInfo() {
    return {
      title: "Account Profile - Project BLiP",
    };
  },
};
</script>
