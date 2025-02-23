import { useParams } from "react-router-dom";
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

  useEffect(() => {
    window.scrollTo(0, 0);
    getJobByPosterId(user.id)
      .then((res) => {
        setJobList(res);
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
