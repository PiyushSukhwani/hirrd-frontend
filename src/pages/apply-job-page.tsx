import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../Components/ApplyJob/apply-job-comp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const ApplyJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    getJob(id)
      .then((res) => setJob(res))
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Button
        my={"lg"}
        color="brightSun.4"
        variant="light"
        leftSection={<IconArrowLeft size={20} />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <ApplyJobComp {...job}/>
    </div>
  );
};

export default ApplyJobPage;
