import { useParams } from "react-router-dom";
// import { jobList } from "../../Data/JobsData";
import JobCard from "../FindJobs/job-card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../../Services/JobService";

const RecommendedJobs = () => {
  const { id } = useParams();
  const [jobList, setJobList] = useState<any[]>([]);

  useEffect(() => {
    getAllJobs()
      .then((res) => setJobList(res))
      .catch((err) => console.error(err));
  });

  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Jobs</div>
      <div className="flex flex-col flex-wrap gap-5">
        {jobList?.map(
          (job: any, index: number) =>
            index < 6 && job.id != id && <JobCard {...job} />
        )}
      </div>
    </div>
  );
};

export default RecommendedJobs;
