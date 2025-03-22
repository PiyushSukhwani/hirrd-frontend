import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../../Data/PostJob";
import { SelectInput } from "../UI/select-input";
import TextEditor from "../UI/text-editor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../../Services/JobService";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Services/NotifiationService";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const PostJob = () => {
  const select = [...fields];
  const navigate = useNavigate();
  const profile = useSelector((state: any) => state.profile);
  const { id } = useParams();
  const [editorData, setEditorData] = useState(content);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (Number(id) != 0) {
      getJob(id)
        .then((res) => {
          form.setValues(res);
          setEditorData(res.description);
        })
        .catch((err) => console.error(err));
    } else {
      form.reset();
    }
  }, [id]);

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      jobTitle: "",
      company: "",
      experience: "",
      jobType: "",
      location: "",
      packageOffered: "",
      skillsRequired: [],
      about: "",
      description: content,
    },
    validate: {
      jobTitle: isNotEmpty("Please enter a job title."),
      company: isNotEmpty("Please provide the company name."),
      experience: isNotEmpty("Experience details are required."),
      jobType: isNotEmpty("Please specify the job type."),
      location: isNotEmpty("Location cannot be empty."),
      packageOffered: isNotEmpty("Please enter the offered salary package."),
      skillsRequired: isNotEmpty("Select at least one required skill."),
      about: isNotEmpty("Provide a brief job overview."),
      description: isNotEmpty("Job description is required."),
    },
  });

  const handlePost = () => {
    form.validate();
    if (!form.isValid()) return;

    postJob({ ...form.getValues(), posterId: profile.id, jobStatus: "ACTIVE", id: 0 })
      .then((res: any) => {
        SuccessNotification("Success", "Job Posted Successfully");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.error(err);
        ErrorNotification("Error", err.response.data.errorMessage);
      });
  };

  const handleDraft = () => {
    postJob({
      ...form.getValues(),
      posterId: profile.id,
      id,
      jobStatus: "DRAFT",
    })
      .then((res: any) => {
        console.log(res);

        SuccessNotification("Success", "Job Drafted");
        navigate(`/posted-job/${res.id}`);
      })
      .catch((err) => {
        console.error(err);
        ErrorNotification("Error", err.response.data.errorMessage);
      });
  };

  return (
    <div className="w-4/5 mx-auto">
      <div className="text-2xl font-semibold mb-5">Post Job</div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[0]} form={form} name="jobTitle" />
          <SelectInput {...select[1]} form={form} name="company" />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[2]} form={form} name="experience" />
          <SelectInput {...select[3]} form={form} name="jobType" />
        </div>
        <div className="flex gap-10 [&>*]:w-1/2">
          <SelectInput {...select[4]} form={form} name="location" />
          <NumberInput
            {...form.getInputProps("packageOffered")}
            label="Salary"
            placeholder="Enter Salary"
            hideControls
            withAsterisk
            min={1}
            max={300}
            clampBehavior="strict"
          />
        </div>
        <TagsInput
          {...form.getInputProps("skillsRequired")}
          withAsterisk
          label="Skills"
          placeholder="Enter skill"
          clearable
          acceptValueOnBlur
          splitChars={[",", "|", " "]}
        />
        <Textarea
          {...form.getInputProps("about")}
          label="About Job"
          withAsterisk
          placeholder="Enter About Job"
          className="my-3"
          autosize
          minRows={2}
        />
        <div className="[&_button[data-active='true']]:!text-bright-sun-400 [&_button[data-active='true']]:!bg-bright-sun-400/10">
          <div className="text-sm font-medium">
            Job Description <span className="text-red-500">*</span>{" "}
          </div>
          <TextEditor form={form} data={editorData} />
        </div>
        <div className="flex gap-4">
          <Button color="brightSun.4" variant="light" onClick={handlePost}>
            Publish Job
          </Button>
          <Button color="brightSun.4" variant="outline" onClick={handleDraft}>
            Save as Draft
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
