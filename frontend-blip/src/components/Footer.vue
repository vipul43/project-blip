<template>
  <v-footer height="100" padless>
    <v-card flat tile class="black--text text-center" color="#F2EFEC">
      <v-card-text>
        <v-btn
          v-for="(media, i) in medias"
          :key="i"
          class="mx-4 black--text"
          icon
        >
          <v-icon size="24px">
            {{ media.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="black--text pt-0">
        There is humanity in every individual, but sometimes its deep and
        dormant. We tap that humanity by invoking ego. Healthy donors can now
        track thier donated blood, like what components the blood is divided
        into, where each component is now at, in which hospital it is used, how
        many lives are saved, also share it on social media, get reminded of
        regular donation periods, donation campaigns, donation requirements.
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="black--text">
        {{ new Date().getFullYear() }} — <strong>Project BLiP</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  components: {},
  data: () => ({
    medias: [
      {
        icon: "mdi-facebook",
        src: "",
      },
      {
        icon: "mdi-twitter",
        src: "",
      },
      {
        icon: "mdi-linkedin",
        src: "",
      },
      {
        icon: "mdi-instagram",
        src: "",
      },
      {
        icon: "mdi-email",
        src: "",
      },
    ],
  }),
};
</script>
