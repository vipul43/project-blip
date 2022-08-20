import axios from "axios";
import store from "@/store";

const httpClient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.VUE_APP_API_BASE_URI_DEPLOY
      : process.env.VUE_APP_API_BASE_URI_DEVELOP,
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
    !config.url.startsWith("/user/login") &&
    !config.url.startsWith("/partner/login") &&
    !config.url.startsWith("/user/reset-password") &&
    !config.url.startsWith("/partner/reset-password") &&
    !config.url.startsWith("/user/verify-email")
  ) {
    config.headers["Authorization"] = `Bearer ${store.getters["auth/token"]}`;
  }
  return config;
});

/*************************** User APIs ***************************/
//User CRUD Operations
export const createUser = async (user) => {
  const response = await httpClient.post(
    `/user/signup?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const validateUser = async (user) => {
  const response = await httpClient.post(
    `/user/signin?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const authUser = async (user) => {
  const response = await httpClient.post(
    `/user/auth?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const invalidateUser = async (user) => {
  const response = await httpClient.post(
    `/user/signout?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const updateUser = async (user) => {
  const response = await httpClient.post(
    `/user/update?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await httpClient.post(
    `/user/delete?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const genResetPasswordLinkUser = async (user) => {
  const response = await httpClient.post(
    `/user/gen-reset-password-link?auth=User-Reset-Password`,
    JSON.stringify(user)
  );
  return response.data;
};
export const resetPasswordUser = async (token, user) => {
  httpClient.defaults.headers.post["Authorization"] = `Bearer ${token}`;
  const response = await httpClient.post(
    `/user/reset-password?auth=User-Reset-Password`,
    JSON.stringify(user)
  );
  return response.data;
};
export const genVerifyEmailLinkUser = async (user) => {
  const response = await httpClient.post(
    `/user/gen-verify-email-link?auth=User-Verify-Email`,
    JSON.stringify(user)
  );
  return response.data;
};
export const verifyEmailUser = async (token, user) => {
  httpClient.defaults.headers.post["Authorization"] = `Bearer ${token}`;
  const response = await httpClient.post(
    `/user/verify-email?auth=User-Verify-Email`,
    JSON.stringify(user)
  );
  return response.data;
};
//Donation CRUD Operations from User POV
export const addUserDonation = async (user, userId) => {
  const response = await httpClient.post(
    `/user/donation-details/${userId}?auth=User`,
    JSON.stringify(user)
  );
  return response.data;
};
export const getUserDonation = async (userId, isArchived) => {
  const response = await httpClient.get(
    `/user/donation-details/${userId}?isArchived=${isArchived}&auth=User`
  );
  return response.data;
};
export const updateUserDonation = async (userId, donationId, donation) => {
  const response = await httpClient.put(
    `/user/donation-details/${userId}/update/${donationId}?auth=User`,
    donation
  );
  return response.data;
};

/*************************** Partner APIs ***************************/
//Partner CRUD Operations
export const createPartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signup?auth=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const validatePartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signin?auth=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const authPartner = async (user) => {
  const response = await httpClient.post(
    `/partner/auth?auth=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const invalidatePartner = async (user) => {
  const response = await httpClient.post(
    `/partner/signout?auth=Partner`,
    JSON.stringify(user)
  );
  return response.data;
};
export const genResetPasswordLinkPartner = async (user) => {
  const response = await httpClient.post(
    `/partner/gen-reset-password-link?auth=Partner-Reset-Password`,
    JSON.stringify(user)
  );
  return response.data;
};
export const resetPasswordPartner = async (token, user) => {
  httpClient.defaults.headers.post["Authorization"] = `Bearer ${token}`;
  const response = await httpClient.post(
    `/partner/reset-password?auth=Partner-Reset-Password`,
    JSON.stringify(user)
  );
  return response.data;
};
//Donation CRUD Operations from Partner POV
export const addPartnerDonation = async (donation, partnerId) => {
  const response = await httpClient.post(
    `/partner/donation-details/${partnerId}?auth=Partner`,
    JSON.stringify(donation)
  );
  return response.data;
};
export const getPartnerDonation = async (userId, isArchived) => {
  const response = await httpClient.get(
    `/partner/donation-details/${userId}?isArchived=${isArchived}&auth=Partner`
  );
  return response.data;
};
export const updatePartnerDonation = async (userId, donationId, donation) => {
  const response = await httpClient.put(
    `/partner/donation-details/${userId}/update/${donationId}?auth=Partner`,
    donation
  );
  return response.data;
};

/*************************** Admin APIs ***************************/
//Admin CRUD Operations
export const validateAdmin = async (user) => {
  const response = await httpClient.post(
    `/admin/signin?auth=Admin`,
    JSON.stringify(user)
  );
  return response.data;
};
export const authAdmin = async (user) => {
  const response = await httpClient.post(
    `/admin/auth?auth=Admin`,
    JSON.stringify(user)
  );
  return response.data;
};
export const invalidateAdmin = async (user) => {
  const response = await httpClient.post(
    `/admin/signout?auth=Admin`,
    JSON.stringify(user)
  );
  return response.data;
};
//Fetch All Users for Admin View
export const getUsers = async () => {
  const response = await httpClient.get(`admin/users?auth=Admin`);
  return response.data;
};

/*************************** Stats APIs ***************************/
export const getActiveUsersCount = async () => {
  const response = await httpClient.get(`/stats/active-users-count`);
  return response.data;
};
export const getActivePartnersCount = async () => {
  const response = await httpClient.get(`/stats/active-partners-count`);
  return response.data;
};
export const getDonationsCount = async () => {
  const response = await httpClient.get(`/stats/donations-count`);
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

/*************************** Open APIs ***************************/
// Blog TODO: LATER
// export const getAllBlogs = async () => {
//   const response = await httpClient.get(`/blogs`);
//   return response.data;
// };
// export const getBlog = async (blogId) => {
//   const response = await httpClient.get(`/blogs/${blogId}`);
//   return response.data;
// };
// // FAQ
export const getAllFAQs = async () => {
  const response = await httpClient.get(`/faqs`);
  return response.data;
};
