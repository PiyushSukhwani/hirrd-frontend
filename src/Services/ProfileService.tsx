import axiosInstance from "../Interceptor/AxiosInterceptor";

// const base_url = "http://localhost:8080/profiles/";

const getProfile = async (id: any) => {
  return axiosInstance
    .get(`/profiles/get/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
const getAllProfiles = async () => {
  return axiosInstance
    .get(`/profiles/getAllProfiles`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

const updateProfile = async (profile: any) => {
  return axiosInstance
    .put(`/profiles/update`, profile)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    })
};

export { getProfile, updateProfile, getAllProfiles };
