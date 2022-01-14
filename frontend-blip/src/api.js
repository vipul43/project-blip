import axios from "axios";
import store from "@/store";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI_DEVELOP,
  headers: { "Content-Type": "application/json", Accept: "*" },
});

httpClient.interceptors.request.use((config) => {
  const token = store.getters["auth/token"];
  if (token && config.url != "/user/signin" && config.url != "/user/signup") {
    config.headers["Authorization"] = `Bearer ${store.getters["auth/token"]}`;
  }
  return config;
});

/*************************** User APIs ***************************/
export const createUser = async (user) => {
  const response = await httpClient.post(`/user/signup`, JSON.stringify(user));
  return response.data;
};
export const validateUser = async (user) => {
  const response = await httpClient.post(`/user/signin`, JSON.stringify(user));
  return response.data;
};
export const authUser = async (user) => {
  const response = await httpClient.post(`/user/auth`, JSON.stringify(user));
  return response.data;
};
export const invalidateUser = async (user) => {
  const response = await httpClient.post(`/user/signout`, JSON.stringify(user));
  return response.data;
};

/*************************** Partner APIs ***************************/
export const createPartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signup`,
    JSON.stringify(user)
  );
  return response.data;
};
export const validatePartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signin`,
    JSON.stringify(user)
  );
  return response.data;
};
export const authPartner = async (user) => {
  const response = await httpClient.post(`/partner/auth`, JSON.stringify(user));
  return response.data;
};
export const invalidatePartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signout`,
    JSON.stringify(user)
  );
  return response.data;
};
