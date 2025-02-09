import { jobList } from "../../Data/JobsData";
import Sort from "../UI/Sort";
import JobCard from "./job-card";

const Jobs = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 items-center justify-center">
        {jobList.map((job, index) => (
          <JobCard key={index} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
