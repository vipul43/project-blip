<template>
  <div id="home">
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
