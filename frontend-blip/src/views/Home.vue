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
        <v-row justify="center">
          <v-col sm="6">
            <v-sheet color="white" elevation="24" height="250" width="400"
              ><apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart></v-sheet
          ></v-col>
          <v-col sm="6">
            <v-sheet color="white" elevation="24" height="250" width="400"
              ><apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart></v-sheet
          ></v-col>
        </v-row>
        <v-row justify="center">
          <v-col sm="6">
            <v-sheet color="white" elevation="24" height="250" width="400"
              ><apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart></v-sheet
          ></v-col>
          <v-col sm="6">
            <v-sheet color="white" elevation="24" height="250" width="400"
              ><apexchart
                type="pie"
                width="380"
                :options="chartOptions"
                :series="series"
              ></apexchart></v-sheet
          ></v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
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
