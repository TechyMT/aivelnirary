import axios, { AxiosResponse } from 'axios';
import config from './config';

const instance = axios.create({
  baseURL: config.baseURL,
});

/**
 * API Instance with methods for GET, POST, PUT, PATCH, DELETE to make requests to the backend.
 * A single instance is created to be used throughout the application which improves performace
 * by reusing the same instance for all requests as compared to creating a new instance for each request.
 *
 * @example api.get("/flows", { id: 1 }, { "Content-Type": "application/json" });
 */
let api = {
  /**
   * GET request to the backend
   * @param url API endpoint of the backend base URL to which a request is made
   * @param params Optional query parameters to be sent with the request
   * @param optionalHeaders Optional headers to be sent with the request
   * @returns {Promise<AxiosResponse<any, any>>}
   *
   * @example api.get("users", { id: 1 }, { "Content-Type": "application/json" });
   */
  get: (
    url: string,
    params: any = {},
    optionalHeaders: any = {}
  ): Promise<AxiosResponse<any, any>> =>
    instance({
      method: 'GET',
      url: `${url}/`,
      params: params,
      headers: {
        ...optionalHeaders,
      },
    }),

  /**
   * POST request to the backend
   * @param url API endpoint of the backend base URL to which a request is made
   * @param data Data to be sent as the request body
   * @param params Optional query parameters to be sent with the request
   * @param optionalHeaders Optional headers to be sent with the request
   * @returns {Promise<AxiosResponse<any, any>>}
   *
   * @example api.post("/flows", { id: 1, name: "Flow 1" }, {}, { "Content-Type": "application/json" });
   */
  post: (
    url: string,
    data: any,
    params: any = {},
    optionalHeaders: any = {}
  ): Promise<AxiosResponse<any, any>> =>
    instance({
      method: 'POST',
      url: `${url}/`,
      data: data,
      params: params,
      headers: {
        ...optionalHeaders,
      },
    }),

  /**
   * PUT request to the backend
   * @param url API endpoint of the backend base URL to which a request is made
   * @param data Data to be sent as the request body
   * @param params Optional query parameters to be sent with the request
   * @param optionalHeaders Optional headers to be sent with the request
   * @returns {Promise<AxiosResponse<any, any>>}
   *
   * @example api.put("/flows", { id: 1, name: "Flow 1" }, {}, { "Content-Type": "application/json" });
   */
  put: (
    url: string,
    data: any,
    params: any = {},
    optionalHeaders: any = {}
  ): Promise<AxiosResponse<any, any>> =>
    instance({
      method: 'PUT',
      url: `${url}/`,
      data: data,
      params: params,
      headers: {
        ...optionalHeaders,
      },
    }),

  /**
   * PATCH request to the backend
   * @param url API endpoint of the backend base URL to which a request is made
   * @param data Data to be sent as the request body
   * @param params Optional query parameters to be sent with the request
   * @param optionalHeaders Optional headers to be sent with the request
   * @returns {Promise<AxiosResponse<any, any>>}
   *
   * @example api.patch("/flows", { id: 1, name: "Flow Updated" }, {}, { "Content-Type": "application/json" });
   */
  patch: (
    url: string,
    data: any,
    params: any = {},
    optionalHeaders: any = {}
  ): Promise<AxiosResponse<any, any>> =>
    instance({
      method: 'PATCH',
      url: `${url}/`,
      data: data,
      params: params,
      headers: {
        ...optionalHeaders,
      },
    }),

  /**
   * DELETE request to the backend
   * @param url API endpoint of the backend base URL to which a request is made
   * @param data Data to be sent as the request body
   * @param params Optional query parameters to be sent with the request
   * @param optionalHeaders Optional headers to be sent with the request
   * @returns {Promise<AxiosResponse<any, any>>}
   *
   * @example api.delete("/flows", { id: 1 }, {}, { "Content-Type": "application/json" });
   */
  delete: (
    url: string,
    data?: any,
    params: any = {},
    optionalHeaders: any = {}
  ): Promise<AxiosResponse<any, any>> =>
    instance({
      method: 'DELETE',
      url: `${url}/`,
      data: data,
      params: params,
      headers: {
        ...optionalHeaders,
      },
    }),
};

export default api;
