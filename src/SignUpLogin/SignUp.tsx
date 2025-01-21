import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create Account</div>

      <TextInput
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Full Name"
        placeholder="Your name"
        withAsterisk
      />
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
      <PasswordInput
        leftSection={<IconLock style={{ width: rem(16), height: rem(16) }} />}
        placeholder="Confirm password"
        label="Confirm Password"
        withAsterisk
      />
      <Checkbox
        label={
          <>
            I accept <Anchor>terms & conditions</Anchor>
          </>
        }
        autoContrast
      />
      <Button variant="filled" autoContrast>
        Sign Up
      </Button>
      <div className="mx-auto">Have an account? <Link to={"/login"} className="text-bright-sun-400 hover:underline">Login</Link></div>
    </div>
  );
};

export default SignUp;
