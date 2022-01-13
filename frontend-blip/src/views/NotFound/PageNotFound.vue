<template>
  <div id="page-not-found">
    <v-container>
      <center>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card height="400" color="transparent" flat>
              <v-row justify="center">
                <v-col cols="12" sm="2"> </v-col>
                <v-col cols="12" sm="2"> </v-col>
              </v-row>
              <div class="text-h1 font-weight-thin">404</div>
              <div class="display-3 mt-5">Not Found</div>
              <br />
              <div class="grey--text lighten-5">
                The page you are trying to get to never existed on this server,
                or has migrated to another place.
              </div>
              <br />
              <div id="anim">
                <v-img
                  src="https://vipul43.sirv.com/projectblip/animations/blood-donation.gif"
                  max-height="200"
                  max-width="200"
                ></v-img>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </center>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  metaInfo() {
    return {
      title: "404 - Page Not Found",
    };
  },
};
</script>

<style lang="scss" scoped>
#anim {
  display: flex;
  justify-content: center;
}
</style>
