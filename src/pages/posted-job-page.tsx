import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../Components/PostedJob/posted-job";
import PostedJobDesc from "../Components/PostedJob/postedJob-desp";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobByPosterId } from "../Services/JobService";

const PostedJobPage = () => {
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const [jobList, setJobList] = useState<any[]>([]);
  const [job, setJob] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobByPosterId(user.id)
      .then((res) => {
        setJobList(res);
        if (res.length > 0 && Number(id) == 0)
          navigate(`/posted-job/${res[0].id}`);
        setJob(res.find((item: any) => item.id == id));
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5">
        <PostedJob jobList={jobList} job={job} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  );
};

export default PostedJobPage;
