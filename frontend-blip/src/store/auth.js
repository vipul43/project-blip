import { createUser, validateUser, authUser, invalidateUser } from "@/api.js";

export default {
  namespaced: true,
  state: {
    token: JSON.parse(localStorage["blip-token"] || null),
    user: JSON.parse(localStorage["blip-user"] || null),
  },
  getters: {
    authenticated(state) {
      return state.token && state.user;
    },
    user(state) {
      return state.user;
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
    SET_USER(state, user) {
      state.user = user;
      localStorage["blip-user"] = JSON.stringify(state.user);
    },
  },
  actions: {
    async register({ dispatch }, credentials) {
      try {
        const response = await createUser(credentials);
        if (response.error) {
          throw response.error;
        }
        return dispatch("attempt", response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async validate({ dispatch }, credentials) {
      try {
        const response = await validateUser(credentials);
        if (response.error) {
          throw response.error;
        }
        return dispatch("attempt", response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    async attempt({ commit }, data) {
      if (data && data.token && data.user) {
        commit("SET_TOKEN", data.token);
        try {
          const response = await authUser(data.user);
          if (response.error) {
            throw response.error;
          }
          commit("SET_USER", response);
        } catch (error) {
          commit("SET_TOKEN", null);
          commit("SET_USER", null);
          console.log(error);
          throw error;
        }
      }
    },
    invalidate({ commit }, data) {
      return invalidateUser(data)
        .then(() => {
          commit("SET_TOKEN", null);
          commit("SET_USER", null);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
