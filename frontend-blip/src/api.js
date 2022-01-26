import axios from "axios";
import store from "@/store";

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URI_DEVELOP,
  headers: { "Content-Type": "application/json", Accept: "*" },
});
const httpClient2 = axios.create({
  baseURL: process.env.VUE_APP_API_COUNTRY_STATE_CITY,
  headers: {
    "Content-Type": "application/json",
    Accept: "*",
    "X-CSCAPI-KEY": process.env.VUE_APP_APIKEY_COUNTRY_STATE_CITY,
  },
});

httpClient.interceptors.request.use((config) => {
  const token = store.getters["auth/token"];
  if (
    token &&
    config.url != "/user/signin" &&
    config.url != "/user/signup" &&
    config.url != "/partner/signin" &&
    config.url != "/partner/signup"
  ) {
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
  const response = await httpClient.post(
    `/user/auth?role=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const invalidateUser = async (user) => {
  const response = await httpClient.post(
    `/user/signout?role=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const updateUser = async (user) => {
  const response = await httpClient.post(
    `/user/update?role=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await httpClient.post(
    `/user/delete?role=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const addUserDonation = async (user, userId) => {
  const response = await httpClient.post(
    `/user/dontion-details/${userId}?role=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const getUserDonation = async (user, userId) => {
  const response = await httpClient.get(
    `/user/dontion-details/${userId}?role=User`,
    JSON.stringify(user)
  );
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
  const response = await httpClient.post(
    `/partner/auth?role=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const invalidatePartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signout?role=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const addPartnerDonation = async (donation, partnerId) => {
  const response = await httpClient.post(
    `/partner/donation-details/${partnerId}?role=Partner`,
    JSON.stringify(donation)
  );
  return response.data;
};
export const getPartnerDonation = async (donation, partnerId) => {
  const response = await httpClient.get(
    `/partner/donation-details/${partnerId}?role=Partner`,
    JSON.stringify(donation)
  );
  return response.data;
};

/*************************** External APIs ***************************/
// Country, State and City APIs
export const getAllCountries = async () => {
  const response = await httpClient2.get();
  return response.data;
};
export const getStatesByCountry = async (ciso) => {
  const response = await httpClient2.get(`/${ciso}/states`);
  return response.data;
};
export const getCitiesByStateAndCountry = async (ciso, siso) => {
  const response = await httpClient2.get(`${ciso}/states/${siso}/cities`);
  return response.data;
};
