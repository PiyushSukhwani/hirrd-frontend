import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../Services/UserService";
import { useState } from "react";
import { loginValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  email: "",
  password: "",
};

const Login = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setData({ ...data, [event.target.name]: event.target.value });
    setFormError({...formError, [event.target.name]: ""})
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
      loginUser(data)
        .then((res) => {
          console.log(res);
          notifications.show({
            title: "Login Successful",
            message: "Redirecting to home page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(() => {
            navigate("/");
          }, 4000);
          setData(form);
        })
        .catch((e) => {
          console.error(e);
          notifications.show({
            title: "Login failed",
            message: e.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: "red",
            withBorder: true,
            className: "!border-red-500 !m-1",
          });
        });
    }
  };
  return (
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
        label="Password"
        name="password"
        value={data.password}
        error={formError.password}
        onChange={handleChange}
        withAsterisk
      />
      <Button variant="filled" autoContrast onClick={handleSubmit}>
        Sign Up
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
          SignUp
        </span>
      </div>
    </div>
  );
};

export default Login;
