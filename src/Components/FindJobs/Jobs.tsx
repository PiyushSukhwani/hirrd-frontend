import { useEffect, useState } from "react";
import Sort from "../UI/Sort";
import JobCard from "./job-card";
import { getAllJobs } from "../../Services/JobService";

const Jobs = () => {
  const [jobList, setjobList] = useState([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => {
        setjobList(res);
        console.log(res);
        
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-16 items-center justify-center">
        {jobList?.map((job:any, index:number) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
