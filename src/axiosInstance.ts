import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

interface ErrorResponseData {
  message: string;
}

interface CustomError {
  isError: boolean;
  errorCode: number | string;
  errorMsg: string;
  userToken?: null;
}

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

// Interceptors for handling responses and errors
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<ErrorResponseData>): Promise<CustomError> => {
    const status = error.response?.status;
    const message = error.response?.data?.message || 'Unable to perform request';

    if (status === 500) {
      return Promise.reject({ isError: true, errorCode: 500, errorMsg: message });
    }
    if (status === 401) {
      return Promise.reject({ userToken: null, errorCode: 401, errorMsg: message });
    }
    if (status === 404) {
      return Promise.reject({ isError: true, errorCode: 404, errorMsg: message });
    }
    if (status === 403) {
      return Promise.reject({ isError: true, errorCode: 403, errorMsg: message });
    }
    if (error.code === 'ERR_NETWORK') {
      return Promise.reject({
        isError: true,
        errorCode: 'ERR_NETWORK',
        errorMsg: message,
      });
    }

    return Promise.reject({ isError: true, errorCode: '*', errorMsg: message });
  },
);

export default axiosInstance;
