import axios from "axios";
import { removeJwt } from "../Slices/JwtSlice";
import { removeUser } from "../Slices/UserSlice";
// const base_url = "http://localhost:8080/auth/";
const base_url = import.meta.env.VITE_BACKEND_BASE_URL;

const loginUser = async (login: any) => {
  return axios
    .post(`${base_url}/auth/login`, login)
    .then((result) => result.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const navigateToLogin = async (navigate: any, dispatch:any) => {
  await dispatch(removeJwt())
  await dispatch(removeUser())
  navigate("/login");
};

export { loginUser, navigateToLogin };
