import axios from "axios";
const base_url = "http://localhost:8080/jobs/";

const postJob = async (job: any) => {
  axios
    .post(`${base_url}postJob`, job)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const getAllJobs = async () => {
  return axios
    .get(`${base_url}getAllJobs`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const getJob = async (id: any) => {
  return axios
    .get(`${base_url}getJob/${id}`)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};

const applyJob = async (id: any, applicant: any) => {
  return axios
    .post(`${base_url}apply/${id}`, applicant)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export { postJob, getAllJobs, getJob, applyJob };
