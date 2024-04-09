import axiosLibrary from "axios";
import { BASE_URL } from "~/constants/common.constant";
import { getFromLocalStorage } from "~/helpers/common.helper";

const getHeaderRequest = () => {
  return {
    Authorization: "Bearer " + getFromLocalStorage("token"),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };
};
const axiosApi = axiosLibrary.create({
  baseURL: BASE_URL,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

interface IOptionsAxios {
  params?: Record<string, any>;
  headers?: Record<string, any>;
}
export const axiosCore = {
  get: (url: string, options?: IOptionsAxios): Promise<any> => {
    return axiosApi
      .get(url, {
        params: options?.params || {},
        headers: {
          ...getHeaderRequest(),
          ...options?.headers,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response?.data || err);
  },

  post: (
    url: string,
    body?: Record<string, any>,
    options?: IOptionsAxios
  ): Promise<any> => {
    return axiosApi
      .post(url, body || {}, {
        params: options?.params || {},
        headers: {
          ...getHeaderRequest(),
          ...options?.headers,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response?.data || err);
  },

  put: (
    url: string,
    body?: Record<string, any>,
    options?: IOptionsAxios
  ): Promise<any> => {
    return axiosApi
      .put(url, body || {}, {
        params: options?.params || {},
        headers: {
          ...getHeaderRequest(),
          ...options?.headers,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response?.data || err);
  },

  path: (
    url: string,
    body?: Record<string, any>,
    options?: IOptionsAxios
  ): Promise<any> => {
    return axiosApi
      .patch(url, body || {}, {
        params: options?.params || {},
        headers: {
          ...getHeaderRequest(),
          ...options?.headers,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response?.data || err);
  },

  delete: async (url: string, options?: IOptionsAxios) => {
    return axiosApi
      .delete(url, {
        params: options?.params || {},
        headers: {
          ...getHeaderRequest(),
          ...options?.headers,
        },
      })
      .then((res) => res.data)
      .catch((err) => err.response?.data || err);
  },
};
