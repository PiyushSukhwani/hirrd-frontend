import {
  Button,
  FileInput,
  LoadingOverlay,
  NumberInput,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { getBase64 } from "../../Services/Utilities";
import { applyJob } from "../../Services/JobService";
import { useNavigate, useParams } from "react-router-dom";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Services/NotifiationService";
import { useSelector } from "react-redux";

const ApplicationForm = () => {
  const [preview, setPreview] = useState(false);
  const [submit, setSubmit] = useState(false);
  const { id } = useParams();
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      resume: null,
      coverLetter: "",
    },
    validate: {
      name: (value) => (value ? null : "Please provide your name."),
      email: (value) =>
        value
          ? /^\S+@\S+\.\S+$/.test(value)
            ? null
            : "Enter a valid email address."
          : "Email is required.",
      phone: (value) =>
        value
          ? /^\d{10}$/.test(value)
            ? null
            : "Enter a valid 10-digit phone number."
          : "Phone number is required.",
      website: (value) =>
        value
          ? /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/([\w/_-]+)*)*\/?$/.test(value)
            ? null
            : "Enter a valid website URL."
          : "Website is required.",
      resume: (value) => (value ? null : "Please upload your resume."),
      coverLetter: (value) => (value ? null : "Please provide a cover letter."),
    },
  });

  const handlePreview = () => {
    form.validate();
    if (!form.isValid()) return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    setPreview(!preview);
  };

  const handleSubmit = async () => {
    setSubmit(true);
    let resume: any = await getBase64(form.getValues().resume);
    let applicant = {
      ...form.getValues(),
      resume: resume.split(",")[1],
      applicantId: user.id,
    };
    applyJob(id, applicant)
      .then((res) => {
        setSubmit(false);
        SuccessNotification("Success", res.message);
        navigate("/job-history");
      })
      .catch((err) => {
        setSubmit(false);
        ErrorNotification("Failed", err.response.data.errorMessage);
      });
  };

  return (
    <>
      <LoadingOverlay
        className="!fixed "
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "brightSun.4", type: "bars" }}
        visible={submit}
      />
      <div className="text-xl font-semibold mb-5">Submit Your Application</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <TextInput
            {...form.getInputProps("name")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Full Name"
            placeholder="Enter name"
            withAsterisk
          />
          <TextInput
            {...form.getInputProps("email")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Email"
            placeholder="Enter email"
            withAsterisk
          />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <NumberInput
            {...form.getInputProps("phone")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Phone Number"
            placeholder="Enter phone number"
            withAsterisk
            hideControls
            min={0}
            max={9999999999}
            clampBehavior="strict"
          />
          <TextInput
            {...form.getInputProps("website")}
            readOnly={preview}
            variant={preview ? "unstyled" : "default"}
            className={`${preview ? "text-mine-shaft-300 font-semibold" : ""}`}
            label="Personal Website"
            placeholder="Enter Url"
            withAsterisk
          />
        </div>
        <FileInput
          {...form.getInputProps("resume")}
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
          {...form.getInputProps("coverLetter")}
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
    </>
  );
};

export default ApplicationForm;
