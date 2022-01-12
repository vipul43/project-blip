import axios from "axios";
import store from "@/store";

const httpClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json", Accept: "*" },
});

httpClient.interceptors.request.use((config) => {
  const token = store.getters["auth/token"];
  if (token && config.url != "/user/signin" && config.url != "/user/signup") {
    config.headers["Authorization"] = `Bearer ${store.getters["auth/token"]}`;
  }
  return config;
});

// User Level APIs
export const createUser = async (user) => {
  const response = await httpClient.post(`/user/signup`, JSON.stringify(user));
  return response.data;
};
export const validateUser = async (user) => {
  const response = await httpClient.post(`/user/signin`, JSON.stringify(user));
  return response.data;
};
export const authUser = async (token, user) => {
  const response = await httpClient.post(`/user/auth`, JSON.stringify(user));
  return response.data;
};
export const invalidateUser = async (token, user) => {
  const response = await httpClient.post(`/user/signout`, JSON.stringify(user));
  return response.data;
};
