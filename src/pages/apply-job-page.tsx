import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/apply-job-comp";

const ApplyJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to="/jobs" className="my-5 inline-block">
        <Button
          color="brightSun.4"
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <ApplyJobComp />
    </div>
  );
};

export default ApplyJobPage;
