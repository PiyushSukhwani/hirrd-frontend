import Companies from "../Components/landingPage/Companies";
import DreamJob from "../Components/landingPage/dream-job";
import JobCategory from "../Components/landingPage/job-category";
import Subscribe from "../Components/landingPage/Subscribe";
import Testimonials from "../Components/landingPage/Testimonials";
import Working from "../Components/landingPage/Working";

const HomePage = () => {
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins']">
      <DreamJob />
      <Companies />
      <JobCategory />
      <Working />
      <Testimonials />
      <Subscribe />
    </div>
  );
};

export default HomePage;
