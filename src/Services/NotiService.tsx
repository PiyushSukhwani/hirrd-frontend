import axiosInstance from "../Interceptor/AxiosInterceptor";
// const base_url = "http://localhost:8080/notification/";

const getNoti = async (userId: any) => {
  return axiosInstance
    .get(`/notification/get/${userId}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const readNoti = async (id: any) => {
  return axiosInstance
    .put(`/notification/read/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export { getNoti, readNoti };
