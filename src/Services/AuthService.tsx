import axios from "axios";
const base_url = "http://localhost:8080/auth/";

const loginUser = async (login: any) => {
  return axios
    .post(`${base_url}login`, login)
    .then((result) => result.data)
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

const navigateToLogin = (navigate: any) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

export { loginUser, navigateToLogin };
