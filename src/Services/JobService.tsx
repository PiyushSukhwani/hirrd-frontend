import axiosInstance from "../Interceptor/AxiosInterceptor";

// const base_url = "http://localhost:8080/jobs/";

const postJob = async (job: any) => {
  return axiosInstance
    .post(`/jobs/postJob`, job)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const getAllJobs = async () => {
  return axiosInstance
    .get(`/jobs/getAllJobs`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const getJob = async (id: any) => {
  return axiosInstance
    .get(`/jobs/getJob/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const applyJob = async (id: any, applicant: any) => {
  return axiosInstance
    .post(`/jobs/apply/${id}`, applicant)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

const getJobByPosterId = async (id: any) => {
  return axiosInstance
    .get(`/jobs/poster/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const changeApplStatus = async (application: any) => {
  return axiosInstance
    .post(`/jobs/changeApplStatus`, application)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

export {
  postJob,
  getAllJobs,
  getJob,
  applyJob,
  getJobByPosterId,
  changeApplStatus,
};
