import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import JobDesc from "../JobDesc/JobDesc";
import RecommendedJobs from "../JobDesc/recommended-jobs";

const JobDescPage = () => {
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
        <JobDesc />
        <RecommendedJobs />
      </div>
    </div>
  );
};

export default JobDescPage;
