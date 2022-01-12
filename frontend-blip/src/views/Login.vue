<template>
  <div id="login">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="2"
          ><v-img
            src="https://vipul43.sirv.com/projectblip/logos/logo-v2-color-300dpi.png"
          ></v-img>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="4"
          ><v-text-field
            v-model="user.name"
            required
            outlined
            label="User Name"
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="4"
          ><v-text-field
            v-model="user.password"
            required
            outlined
            type="password"
            label="Password"
          ></v-text-field
        ></v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" sm="2"
          ><v-btn id="btn" depressed dark @click="signUp">
            SIGN UP</v-btn
          ></v-col
        >
        <v-col cols="12" sm="2"
          ><v-btn id="btn" depressed dark @click="signIn">
            SIGN IN</v-btn
          ></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data: () => ({
    user: {
      name: "",
      password: "",
    },
  }),
  methods: {
    ...mapActions({
      register: "auth/register",
      validate: "auth/validate",
    }),
    signUp() {
      if (this.user.name != "" && this.user.password != "") {
        this.register({
          name: this.user.name,
          password: this.user.password,
        }).then(() => {
          this.$router
            .replace({
              name: "Dashboard",
            })
            .catch((error) => {
              console.log(error);
              //raise error alert
            });
        });
      } else {
        //raise snack bar
      }
    },
    signIn() {
      if (this.user.name != "" && this.user.password != "") {
        this.validate({
          name: this.user.name,
          password: this.user.password,
        }).then(() => {
          this.$router
            .replace({
              name: "Dashboard",
            })
            .catch((error) => {
              console.log(error);
              //raise error alert
            });
        });
      } else {
        //raise snack bar
      }
    },
  },
  metaInfo() {
    return {
      title: "Login - Project BLiP",
    };
  },
};
</script>

<style lang="scss" scoped>
#btn {
  background: #37414f;
}
</style>
