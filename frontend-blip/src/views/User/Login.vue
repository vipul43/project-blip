<template>
  <div id="user-log-in">
    <v-container>
      <v-card flat>
        <v-tabs v-model="tab" centered slider-color="#222831">
          <v-tab v-for="item in items" :key="item.tabTitle">
            {{ item.tabTitle }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tabTitle">
            <v-card flat>
              <v-card-text>
                {{ item.tabText }}
                <a @click="switchTab(item.tabAction)">
                  {{ item.tabAction }}
                </a>
              </v-card-text>
              <component :is="item.tabComponent"></component>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import UserSignIn from "../../components/User/Signin.vue";
import UserSignUp from "../../components/User/Signup.vue";

export default {
  name: "UserLogIn",
  components: { UserSignIn, UserSignUp },
  data: () => ({
    tab: null,
    items: [
      {
        tabTitle: "User Sign In",
        tabText: "New here? Go ahead and",
        tabAction: "Sign Up",
        tabComponent: "UserSignIn",
      },
      {
        tabTitle: "User Sign Up",
        tabText: "Already have an account?",
        tabAction: "Sign In",
        tabComponent: "UserSignUp",
      },
    ],
  }),
  methods: {
    switchTab(action) {
      if (action === "Sign Up") {
        this.tab = 1;
      } else if (action === "Sign In") {
        this.tab = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.no-uppercase {
  text-transform: none !important;
}
</style>
