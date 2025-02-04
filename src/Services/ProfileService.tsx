import axios from "axios";
const base_url = "http://localhost:8080/profiles/";

const getProfile = async (id: number) => {
  return axios
    .get(`${base_url}get/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const updateProfile = async (profile: any) => {
  return axios
    .put(`${base_url}update`, profile)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export { getProfile, updateProfile };
