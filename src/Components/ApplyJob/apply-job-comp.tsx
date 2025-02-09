import {
  Button,
  CheckIcon,
  Divider,
  FileInput,
  LoadingOverlay,
  Notification,
  NumberInput,
  rem,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ApplyJobComp = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [sec, setSec] = useState(5);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setSubmit(true);
    let x = 5;
    let id = setInterval(() => {
      x--;
      setSec(x);
      if (x == 0) navigate("/jobs");
      //   if (x === 0) clearInterval(id);
    }, 1000);
  };

  const handlePreview = () => {
    setPreview(!preview);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="w-2/3 mx-auto">
        <LoadingOverlay
          className="!fixed "
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
          loaderProps={{ color: "brightSun.4", type: "bars" }}
          visible={submit}
        />
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img src={`/Icons/Google.png`} alt="" className="h-14" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-2xl">Software Engineer</div>
              <div className="text-lg text-mine-shaft-300">
                Google &bull; 3 days ago &bull; 48 Applicants
              </div>
            </div>
          </div>
        </div>
        <Divider my="xl" />
        <div className="text-xl font-semibold mb-5">
          Submit Your Application
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 [&>*]:w-1/2">
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Full Name"
              placeholder="Enter name"
              withAsterisk
            />
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Email"
              placeholder="Enter email"
              withAsterisk
            />
          </div>
          <div className="flex gap-10 [&>*]:w-1/2">
            <NumberInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Phone Number"
              placeholder="Enter phone number"
              withAsterisk
              hideControls
              min={0}
              max={9999999999}
              clampBehavior="strict"
            />
            <TextInput
              readOnly={preview}
              variant={preview ? "unstyled" : "default"}
              className={`${
                preview ? "text-mine-shaft-300 font-semibold" : ""
              }`}
              label="Personal Website"
              placeholder="Enter Url"
              withAsterisk
            />
          </div>
          <FileInput
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            leftSection={<IconPaperclip stroke={1.5} />}
            label="Attach your CV"
            placeholder="Your CV"
            leftSectionPointerEvents="none"
            withAsterisk
          />
          <Textarea
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            withAsterisk
            minRows={4}
            autosize
            placeholder="Type something about yourself..."
            label="Cover Letter"
          />
          {!preview && (
            <Button color="brightSun.4" variant="light" onClick={handlePreview}>
              Preview
            </Button>
          )}
          {preview && (
            <div className="flex gap-10 [&>*]:w-1/2">
              <Button
                color="brightSun.4"
                variant="outline"
                onClick={handlePreview}
                fullWidth
              >
                Edit
              </Button>
              <Button
                color="brightSun.4"
                variant="light"
                onClick={handleSubmit}
                fullWidth
              >
                Submit
              </Button>
            </div>
          )}
        </div>
      </div>
      <Notification
        className={`!border-bright-sun-400 !fixed top-0 left-[35%] !z-[1005]  transition duration-300 ease-in-out ${
          submit ? "translate-y-0" : "-translate-y-20"
        }`}
        icon={<CheckIcon style={{ width: rem(20), height: rem(20) }} />}
        color="teal"
        title="Application Submitted!"
        mt="md"
        withBorder
        withCloseButton={false}
      >
        Redirecting to Find Jobs in {sec} seconds...
      </Notification>
    </>
  );
};

export default ApplyJobComp;
