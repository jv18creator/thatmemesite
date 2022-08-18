import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  responseType: "json",
});

API.defaults.headers.post["content-type"] = "application/json";
API.defaults.headers.get["Accept"] = "application/json";

API.interceptors.request.use(
  (request) => {
    const authenticationData = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (authenticationData?.auth_id) {
      request.headers.Authorization = `Bearer ${authenticationData.auth_id}`;
    }

    // Important: request interceptors **must** return the request.
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    // Dispatch that we finished loading.

    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

export default API;
