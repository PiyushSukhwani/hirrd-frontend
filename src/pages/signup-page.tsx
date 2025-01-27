import SignUp from "../Components/SignUpLogin/SignUp";
import Login from "../Components/SignUpLogin/Login";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

const SignUpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] overflow-hidden relative">
      <Button
        variant="light"
        size="sm"
        my={"lg"}
        color="brightSun.4"
        leftSection={<IconArrowLeft size={20} />}
        onClick={() => navigate("/")}
        className="!absolute left-5 !z-20"
      >
        Home
      </Button>
      <div
        className={`w-[100vw] h-[100vh] flex [&>*]:shrink-0 transition-all ease-in-out duration-1000 ${
          location.pathname === "/signup" ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <Login />
        <div
          className={`w-1/2 h-full bg-mine-shaft-900  ${
            location.pathname === "/signup"
              ? "rounded-r-[200px]"
              : "rounded-l-[200px]"
          } transition-all duration-1000 ease-in-out  flex flex-col gap-5 items-center justify-center`}
        >
          <div className="flex gap-3 items-center">
            <img src="./logo_golden.png" alt="LOGO" className="h-32 w-56" />
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
