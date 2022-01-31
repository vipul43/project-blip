<template>
  <div id="home">
    <div style="background: #fd7014">
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
      </v-container>
    </div>
    <div style="background: #fd7014">
      <v-container>
        <v-carousel
          cycle
          hide-delimiter-background
          show-arrows-on-hover
          prev-icon="mdi-arrow-left"
          next-icon="mdi-arrow-right"
        >
          <v-carousel-item
            v-for="(slide, i) in slides"
            :key="i"
            :src="slide.src"
            eager
          ></v-carousel-item>
        </v-carousel>
      </v-container>
    </div>
    <div style="background: #222831">
      <v-container>
        <div class="pa-4" style="color: white; font-size: 3em">
          How Project BLiP is working?
        </div>
        <div class="pb-8">
          <v-row justify="center">
            <v-col sm="4">
              <v-card color="#56657c" dark tile height="200">
                <v-card-subtitle> #Active Partner(s) </v-card-subtitle>
                <v-card-text style="font-size: 6em" class="pa-11">
                  {{ activeUsersCount }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col sm="4">
              <v-card color="#56657c" dark tile height="200">
                <v-card-subtitle> #Active User(s) </v-card-subtitle>
                <v-card-text style="font-size: 6em" class="pa-11">
                  {{ activePartnersCount }}
                </v-card-text>
              </v-card>
            </v-col>
            <v-col sm="4">
              <v-card color="#56657c" dark tile height="200">
                <v-card-subtitle> #Donation(s) </v-card-subtitle>
                <v-card-text style="font-size: 6em" class="pa-11">
                  {{ donationsCount }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import {
  getActiveUsersCount,
  getActivePartnersCount,
  getDonationsCount,
} from "../api.js";

export default {
  name: "Home",
  components: {},
  data: () => ({
    slides: [
      {
        title: "Landing",
        src: "https://vipul43.sirv.com/projectblip/slides/landing.png",
      },
      {
        title: "Slide01",
        src: "https://vipul43.sirv.com/projectblip/slides/slide01.png",
      },
      {
        title: "Slide02",
        src: "https://vipul43.sirv.com/projectblip/slides/slide02.png",
      },
      {
        title: "Slide03",
        src: "https://vipul43.sirv.com/projectblip/slides/slide03.png",
      },
    ],
    activeUsersCount: 0,
    activePartnersCount: 0,
    donationsCount: 0,
    series: [44, 55, 13, 43, 22],
    chartOptions: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  }),
  async mounted() {
    getActiveUsersCount()
      .then((response) => response.count)
      .then((count) => {
        this.activeUsersCount = count;
      })
      .catch((error) => {
        console.log(error);
      });
    getActivePartnersCount()
      .then((response) => response.count)
      .then((count) => {
        this.activePartnersCount = count;
      })
      .catch((error) => {
        console.log(error);
      });
    getDonationsCount()
      .then((response) => response.count)
      .then((count) => {
        this.donationsCount = count;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  metaInfo() {
    return {
      title: "Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
