import axios from "axios";
const base_url = "http://localhost:8080/users/";

const registerUser = async (user: any) => {
  return axios
    .post(`${base_url}register`, user)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const loginUser = async (login: any) => {
  return axios
    .post(`${base_url}login`, login)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const sendOtp = async (email: string) => {
  return axios
    .post(`${base_url}sendOtp/${email}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const verifyOtp = async (email: string, otp: any) => {
  return axios
    .get(`${base_url}verifyOtp/${email}/${otp}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
const changePass = async (email: string, password: string) => {
  return axios
    .post(`${base_url}changePass`, { email, password })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { registerUser, loginUser, sendOtp, verifyOtp, changePass };
