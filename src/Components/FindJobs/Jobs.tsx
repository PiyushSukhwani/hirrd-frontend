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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap xl:gap-16 items-center justify-start xl:pl-8 lg:pl-6 lg:gap-10 gap-14 pl-10">
        {jobList?.map((job: any, index: number) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
