import axios from "axios";
const base_url = "http://localhost:8080/notification/";

const getNoti = async (userId: any) => {
  return axios
    .get(`${base_url}get/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const readNoti = async (id: any) => {
  return axios
    .put(`${base_url}read/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export { getNoti, readNoti };
