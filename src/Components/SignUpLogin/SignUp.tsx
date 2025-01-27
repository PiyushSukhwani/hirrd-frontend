import {
  Anchor,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Radio,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/UserService";
import { SignupValidation } from "../../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const form = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  accountType: "APPLICANT",
};

const SignUp = () => {
  const [data, setData] = useState<{ [key: string]: string }>(form);

  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
      return;
    }
    let name = event.target.name;
    let value = event.target.value;
    setData({ ...data, [name]: value });
    setFormError({ ...formError, [name]: SignupValidation(name, value) });

    if (name === "confirmPassword") {
      if (value !== data.password) {
        setFormError({ ...formError, [name]: "Passwords do not match" });
      } else setFormError({ ...formError, confirmPassword: "" });
    }

    if (name === "password" && data.confirmPassword !== "") {
      let err = "";
      if (value !== data.confirmPassword) err = "Passwords do not match";
      setFormError({
        ...formError,
        [name]: SignupValidation(name, value),
        confirmPassword: err,
      });
    }
  };

  const handleSubmit = () => {
    let valid = true;
    let newFormError: { [key: string]: string } = {};

    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword")
        newFormError[key] = SignupValidation(key, data[key]);
      else if (data[key] !== data["password"])
        newFormError[key] = "Passwords do not match.";

      if (newFormError[key]) valid = false;
    }

    setFormError(newFormError);

    if (valid) {
      registerUser(data)
        .then((res) => {
          console.log(res);
          setData(form);
          notifications.show({
            title: "Registered Successfully",
            message: "Redirecting to login page...",
            withCloseButton: true,
            icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
            color: "teal",
            withBorder: true,
            className: "!border-green-500",
          });
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        })
        .catch((e) => {
          console.error(e);
          notifications.show({
            title: "Registration failed",
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
        label="Full Name"
        placeholder="Your name"
        name="name"
        error={formError.name}
        value={data.name}
        onChange={handleChange}
        withAsterisk
      />
      <TextInput
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
        name="email"
        error={formError.email}
        value={data.email}
        onChange={handleChange}
        withAsterisk
      />
      <PasswordInput
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter password"
        label="Password"
        name="password"
        error={formError.password}
        value={data.password}
        onChange={handleChange}
        withAsterisk
      />
      <PasswordInput
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Confirm password"
        label="Confirm Password"
        name="confirmPassword"
        error={formError.confirmPassword}
        value={data.confirmPassword}
        onChange={handleChange}
        withAsterisk
      />
      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are?"
        withAsterisk
      >
        <Group mt="xs">
          <Radio
            className="px-6 py-4 hover:bg-mine-shaft-900 border has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg has-[:checked]:border-bright-sun-400 "
            value="APPLICANT"
            label="Applicant"
            autoContrast
          />
          <Radio
            className="px-6 py-4 hover:bg-mine-shaft-900 border has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg  has-[:checked]:border-bright-sun-400"
            value="EMPLOYER"
            label="Employer"
            autoContrast
          />
        </Group>
      </Radio.Group>
      <Checkbox
        label={
          <>
            I accept <Anchor>terms & conditions</Anchor>
          </>
        }
        autoContrast
      />
      <Button variant="filled" autoContrast onClick={handleSubmit}>
        Sign Up
      </Button>
      <div className="mx-auto">
        Have an account?{" "}
        <span
          onClick={() => {
            navigate("/login");
            setFormError(form);
            setData(form);
          }}
          className="text-bright-sun-400 hover:underline cursor-pointer"
        >
          Login
        </span>
      </div>
    </div>
  );
};

export default SignUp;
