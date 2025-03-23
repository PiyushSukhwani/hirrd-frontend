import {
  Button,
  LoadingOverlay,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
// import { loginUser } from "../../Services/UserService";
import { useState } from "react";
import { loginValidation } from "../../Services/FormValidation";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import { useDispatch } from "react-redux";
import { setJwt } from "../../Slices/JwtSlice";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Services/NotifiationService";
import { loginUser } from "../../Services/AuthService";
// import { jwtDecode } from "jwt-decode";
// import { setUser } from "../../Slices/UserSlice";
// import axiosInstance from "../../Interceptor/AxiosInterceptor";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [loading, setLoading] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setFormError({ ...formError, [event.target.name]: "" });
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);

      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);

    if (valid) {
      setLoading(true);
      loginUser(data)
        .then((res: any) => {
          SuccessNotification(
            "Login Successful",
            "Redirecting to home page..."
          );
          dispatch(setJwt(res.jwt));
          // const decodedJwt = jwtDecode(res.jwt);
          // dispatch(setUser({ ...decodedJwt, email: decodedJwt.sub }));

          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 3000);
          setData(form);
        })
        .catch((e: any) => {
          console.error(e);
          setLoading(false);
          if (e?.response?.data?.errorMessage)
          ErrorNotification("Login failed", e.response.data.errorMessage);
        else
        ErrorNotification("Login failed", e.message);
        });
    }
  };
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
      />
      <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
        <div className="text-2xl font-semibold">Create Account</div>

        <TextInput
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          name="email"
          value={data.email}
          error={formError.email}
          onChange={handleChange}
          withAsterisk
        />
        <PasswordInput
          leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
          placeholder="Enter password"
          type="password"
          label="Password"
          name="password"
          value={data.password}
          error={formError.password}
          onChange={handleChange}
          withAsterisk
          onPaste={(e) => e.preventDefault()}
        />
        <Button
          loading={loading}
          variant="filled"
          autoContrast
          onClick={handleSubmit}
        >
          Login
        </Button>
        <div className="mx-auto">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              setFormError(form);
              setData(form);
            }}
            className="text-bright-sun-400 hover:underline cursor-pointer"
          >
            Signup
          </span>
        </div>
        <div
          className="text-bright-sun-400 hover:underline cursor-pointer text-center"
          onClick={open}
        >
          Forget Password?
        </div>
      </div>
      <ResetPassword opened={opened} close={close} />
    </>
  );
};

export default Login;
