import { createUser, validateUser, authUser, invalidateUser } from "@/api.js";

export default {
  namespaced: true,
  state: {
    token: JSON.parse(localStorage["blip-token"] || null),
    username: JSON.parse(localStorage["blip-username"] || null),
  },
  getters: {
    authenticated(state) {
      return state.token && state.username;
    },
    username(state) {
      return state.username;
    },
    token(state) {
      return state.token;
    },
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage["blip-token"] = JSON.stringify(state.token);
    },
    SET_USERNAME(state, username) {
      state.username = username;
      localStorage["blip-username"] = JSON.stringify(state.username);
    },
  },
  actions: {
    async register({ dispatch }, credentials) {
      try {
        const response = await createUser({
          name: credentials.name,
          password: credentials.password,
        });
        if (response.error) {
          throw response.error;
        }
        return dispatch("attempt", {
          token: response.token,
          username: response.user.name,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async validate({ dispatch }, credentials) {
      try {
        const response = await validateUser({
          name: credentials.name,
          password: credentials.password,
        });
        if (response.error) {
          throw response.error;
        }
        return dispatch("attempt", {
          token: response.token,
          username: response.user.name,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async attempt({ commit }, data) {
      if (data && data.token && data.username) {
        commit("SET_TOKEN", data.token);
        try {
          const response = await authUser(data.token, {
            username: data.username,
          });
          if (response.error) {
            throw response.error;
          }
          commit("SET_USERNAME", response.username);
        } catch (error) {
          commit("SET_TOKEN", null);
          commit("SET_USERNAME", null);
          console.log(error);
          throw error;
        }
      }
    },
    invalidate({ commit }, data) {
      return invalidateUser(data.token, {
        username: data.username,
      })
        .then(() => {
          commit("SET_TOKEN", null);
          commit("SET_USERNAME", null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
