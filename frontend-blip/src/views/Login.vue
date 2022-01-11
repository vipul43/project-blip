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
import { createUser, validateUser } from "@/api.js";

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
    async signUp() {
      if (this.user.name != "" && this.user.password != "") {
        try {
          const result = await createUser({
            name: this.user.name,
            password: this.user.password,
          });
          console.log("result ", result);
        } catch (error) {
          console.log(error);
        }
      } else {
        //raise snack bar
      }
    },
    async signIn() {
      if (this.user.name != "" && this.user.password != "") {
        try {
          const result = await validateUser({
            name: this.user.name,
            password: this.user.password,
          });
          console.log("result ", result);
        } catch (error) {
          console.log(error);
        }
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
