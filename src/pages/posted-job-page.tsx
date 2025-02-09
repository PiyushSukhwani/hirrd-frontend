import PostedJob from "../Components/PostedJob/posted-job";
import PostedJobDesc from "../Components/PostedJob/postedJob-desp";

const PostedJobPage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4">
      <div className="flex gap-5">
        <PostedJob />
        <PostedJobDesc />
      </div>
    </div>
  );
};

export default PostedJobPage;
