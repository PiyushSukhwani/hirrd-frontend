import {
  Button,
  Modal,
  PasswordInput,
  PinInput,
  rem,
  TextInput,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { changePass, sendOtp, verifyOtp } from "../../Services/UserService";
import { SignupValidation } from "../../Services/FormValidation";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Services/NotifiationService";
import { useInterval } from "@mantine/hooks";

const ResetPassword = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpSending, setOtpSending] = useState<boolean>(false);
  const [verified, setVerified] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passErr, setPassErr] = useState<string>("");
  const [resendLoader, setResendLoader] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(60);
  const interval = useInterval(() => {
    if (seconds === 0) {
      setResendLoader(false);
      setSeconds(60);
      interval.stop();
    } else setSeconds((s) => s - 1);
  }, 1000);

  const handleSendOtp = () => {
    setOtpSending(true);
    sendOtp(email)
      .then((res) => {
        setOtpSent(true);
        setResendLoader(true);
        SuccessNotification("OTP Sent Successfully", "Enter OTP to reset.");
        interval.start();
        console.log(res);
      })
      .catch((err) => {
        ErrorNotification("OTP Sending Failed", err.response.data.errorMessage);
        console.error(err);
      })
      .finally(() => setOtpSending(false));
  };

  const handleVerifyOtp = (otp: string) => {
    verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        setVerified(true);
        SuccessNotification("OTP Verified", "Enter new password.");
      })
      .catch((err) => {
        ErrorNotification(
          "OTP Verification Failed",
          err.response.data.errorMessage
        );
        // setVerified(false)
        console.error(err);
      });
  };

  const resendOtp = () => {
    if (resendLoader) return;
    handleSendOtp();
  };

  const changeEmail = () => {
    setOtpSent(false);
    setResendLoader(false);
    setSeconds(60);
    setVerified(false);
    interval.stop();
  };

  const handleResetPassword = async () => {
    try {
      const res = await changePass(email, password);
      SuccessNotification("Password Changed", "Login with new password.");
      props.close();
    } catch (err: any) {
      console.error(err);
      ErrorNotification(
        "Password Reset Failed",
        err.response.data.errorMessage
      );
    }
  };

  return (
    <Modal
      opened={props.opened}
      onClose={props.close}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      title="Reset Password"
    >
      <div className="flex flex-col gap-6">
        <TextInput
          leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
          label="Email"
          placeholder="Your email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          withAsterisk
          size="md"
          rightSection={
            <Button
              size="xs"
              className="mr-1"
              disabled={email === "" || otpSent}
              variant="filled"
              autoContrast
              onClick={handleSendOtp}
              loading={otpSending && !otpSent}
            >
              Send
            </Button>
          }
          rightSectionWidth={"xl"}
        />
        {otpSent && (
          <PinInput
            type={"number"}
            length={6}
            className="mx-auto"
            size="md"
            gap="lg"
            onComplete={handleVerifyOtp}
          />
        )}
        {otpSent && !verified && (
          <div className="flex gap-2">
            <Button
              size="xs"
              variant="light"
              autoContrast
              onClick={resendOtp}
              loading={otpSending}
              color="brightSun.4"
              fullWidth
            >
              {resendLoader ? seconds : "Resend"}
            </Button>
            <Button
              size="xs"
              variant="filled"
              autoContrast
              onClick={changeEmail}
              //   loading={otpSending}
              color="brightSun.4"
              fullWidth
            >
              Change Email
            </Button>
          </div>
        )}

        {verified && (
          <PasswordInput
            leftSection={
              <IconLock style={{ width: rem(16), height: rem(16) }} />
            }
            placeholder="Enter password"
            label="Password"
            name="password"
            value={password}
            error={passErr}
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr(SignupValidation("password", e.target.value));
            }}
            withAsterisk
          />
        )}
        {verified && (
          <Button onClick={handleResetPassword}>Change Password</Button>
        )}
      </div>
    </Modal>
  );
};

export default ResetPassword;
