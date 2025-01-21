import SignUp from "../SignUpLogin/SignUp";
import Login from "../SignUpLogin/Login";
import { useLocation } from "react-router-dom";

const SignUpPage = () => {
    const location = useLocation()
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden ">
      <div className={`w-[100vw] h-[100vh] flex [&>*]:shrink-0 transition-all ease-in-out duration-1000 ${location.pathname === "/signup" ? "-translate-x-1/2" : "translate-x-0"}`}>
        <Login />
        <div className={`w-1/2 h-full bg-mine-shaft-900  ${location.pathname === "/signup" ? "rounded-r-[200px]" : "rounded-l-[200px]"} transition-all duration-1000 ease-in-out  flex flex-col gap-5 items-center justify-center`}>
          <div className="flex gap-3 items-center">
            <img src="./logo_golden.png" alt="LOGO" className="h-28 w-48" />
          </div>
          <div className="text-2xl font-semibold text-mine-shaft-200">
            Find the job made for you
          </div>
        </div>
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
