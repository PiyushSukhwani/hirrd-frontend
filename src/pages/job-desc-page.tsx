import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import JobDesc from "../Components/JobDesc/JobDesc";
import RecommendedJobs from "../Components/JobDesc/recommended-jobs";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getJob(id)
      .then((res) => setJob(res))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to="/find-jobs" className="my-5 inline-block">
        <Button
          color="brightSun.4"
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5 justify-around">
        <JobDesc {...job}/>
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default JobDescPage;
