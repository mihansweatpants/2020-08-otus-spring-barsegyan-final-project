import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import qs from 'query-string';
import { BasepApiResponse } from 'api/types/base/response';

const LOGIN_ROUTE = '/login';

export default abstract class HttpApi {
  protected http: AxiosInstance;

  public static AUTH_TOKEN_LOCAL_STORAGE_KEY = 'authToken';

  constructor(protected basePath: string) {
    this.http = axios.create({
      baseURL: basePath,
      timeout: 90000,
      paramsSerializer(params) {
        return qs.stringify(params, { arrayFormat: 'none' });
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.http.interceptors.request.use(
      async (config) => {
        config.headers['X-Auth-Token'] = localStorage.getItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY);

        return config;
      },
      err => Promise.reject(err),
    );
  }

  protected get<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.response<T>(this.auth(this.http.get(url, config)));
  }

  protected post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.response<T>(this.auth(this.http.post(url, data, config)));
  }

  protected put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.response<T>(this.auth(this.http.put(url, data, config)));
  }

  protected patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.response<T>(this.auth(this.http.patch(url, data, config)));
  }

  protected delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return this.response<T>(this.auth(this.http.delete(url, config)));
  }

  protected async getAll<T = any>(url: string, config?: AxiosRequestConfig): Promise<T[]> {
    const DEFAULT_LIMIT = 100;
    let page = 0;

    const { items, totalItems } = await this.get(url, {
      ...config,
      params: { page, limit: DEFAULT_LIMIT },
    });

    const allItems: T[] = items as T[];

    while (allItems.length !== totalItems) {
      page++;
      const { items } = await this.get(url, {
        ...config,
        params: { page, limit: DEFAULT_LIMIT },
      });
      allItems.push(...items as T[]);
    }

    return allItems;
  }

  private async response<T>(request: AxiosPromise<BasepApiResponse<T>>): Promise<T> {
    const response: AxiosResponse<BasepApiResponse<T>> = await request;
    const { data: responseData } = response;

    if (responseData != null && responseData.error != null) {
      throw new Error(responseData.error);
    }

    return responseData.data;
  }

  private async auth<T = any>(request: AxiosPromise<T>): Promise<AxiosResponse<T>> {
    try {
      return await request;
    }
    catch (error) {
      const { response }: AxiosError = error;

      if (response != null && response.status === 403 && window.location.pathname !== LOGIN_ROUTE) {
        window.location.href = LOGIN_ROUTE;
      }

      throw error;
    }
  }
}
