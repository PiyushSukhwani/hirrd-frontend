import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";

const base_url = import.meta.env.VITE_BACKEND_BASE_URL;
// const base_url = "http://localhost:8080/users/";

const registerUser = async (user: any) => {
  return axiosInstance
    .post(`/users/register`, user)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const loginUser = async (login: any) => {
  return axiosInstance
    .post(`/users/login`, login)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const sendOtp = async (email: string) => {
  return axiosInstance
    .post(`/users/sendOtp/${email}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const verifyOtp = async (email: string, otp: any) => {
  return axiosInstance
    .get(`/users/verifyOtp/${email}/${otp}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const changePass = async (email: string, password: string) => {
  return axios
    .post(`${base_url}/users/changePass`, { email, password })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { registerUser, loginUser, sendOtp, verifyOtp, changePass };
