import { Button, TextInput } from "@mantine/core";
import { SelectInput } from "./select-input";
import fields from "../../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Services/NotifiationService";
import { updateProfile } from "../../Services/ProfileService";

const CertiInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("IssueDate is required"),
      certificateId: isNotEmpty("CertificateId is required"),
    },
  });

  const handleSave = async () => {
    form.validate();
    if (!form.isValid) return;

    let certi = [...profile.certifications];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate =
      certi[certi.length - 1].issueDate.toISOString();
    let updatedProfile = { ...profile, certifications: certi };
    let newProfile = await updateProfile(updatedProfile);
    dispatch(changeProfile(newProfile));
    props.setEdit(false);
    SuccessNotification("Success", `Certification Added Successfully`);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          placeholder="Enter title"
          withAsterisk
          label="Title"
        />
        <SelectInput {...select[1]} form={form} name="issuer" />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          label="Issue date"
          placeholder="Pick date"
          maxDate={new Date()}
          withAsterisk
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          placeholder="Enter ID"
          withAsterisk
          label="Certificate ID"
        />
      </div>

      <div className="flex gap-5">
        <Button variant="filled" color="green.8" onClick={handleSave}>
          Save
        </Button>
        <Button
          variant="light"
          color="red.8"
          onClick={() => props.setEdit(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
