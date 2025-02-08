import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../../Data/Profile";
import { SelectInput } from "./select-input";
import { useEffect } from "react";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Services/NotifiationService";

const ExpInput = (props: any) => {
  const select = fields;
  const profile = useSelector((state: any) => state.profile);
  let dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      title: "",
      company: "",
      location: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let exp = [...profile.experiences];
    if (props.add) {
      exp.push(form.getValues());
      exp[exp.length - 1].startDate =
        exp[exp.length - 1].startDate.toISOString();
      exp[exp.length - 1].endDate = exp[exp.length - 1].endDate.toISOString();
    } else {
      exp[props.index] = form.getValues();
      exp[props.index].startDate = exp[props.index].startDate.toISOString();
      exp[props.index].endDate = exp[props.index].endDate.toISOString();
    }

    let updatedProfile = { ...profile, experiences: exp };
    props.setEdit(false);
    props.setAllEdit(false)
    dispatch(changeProfile(updatedProfile));
    SuccessNotification(
      "Success",
      `Experience ${props.add ? "Added" : "Updated"} Successfully`
    );
  };

  useEffect(() => {
    if (!props.add)
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        startDate: new Date(props.startDate),
        endDate: new Date(props.endDate),
        working: props.working,
      });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold text-mine-shaft-300">
        {props.add ? "Add" : "Edit"} Experience
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} form={form} name="title" />
        <SelectInput {...select[1]} form={form} name="company" />
      </div>
      <SelectInput {...select[2]} form={form} name="location" />
      <Textarea
        {...form.getInputProps("description")}
        placeholder="Enter Summary..."
        autosize
        label="Summary"
        minRows={3}
        withAsterisk
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          label="Start date"
          placeholder="Pick date"
          maxDate={form.getValues().endDate || undefined}
          withAsterisk
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          label="End date"
          placeholder="Pick date"
          maxDate={new Date()}
          minDate={form.getValues().startDate || undefined}
          withAsterisk
          disabled={form.getValues().working}
        />
      </div>
      <Checkbox
        {...form.getInputProps("working")}
        label="Currently working here"
        checked={form.getValues().working}
        autoContrast
      />
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

export default ExpInput;
