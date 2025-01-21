import { Button, PasswordInput, rem, TextInput } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>

      <TextInput
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
        withAsterisk
      />
      <PasswordInput
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Enter password"
        label="Password"
        withAsterisk
      />
      <Button variant="filled" autoContrast>
        Sign Up
      </Button>
      <div className="mx-auto">
        Don't have an account?{" "}
        <Link to={"/signup"} className="text-bright-sun-400 hover:underline">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
