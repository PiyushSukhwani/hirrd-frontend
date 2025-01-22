import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../Data/Profile";
import { SelectInput } from "./select-input";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
  const select = fields;
  const [desc, setDesc] = useState<string>(
    "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
  );
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">{props.add ? "Add" : "Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        placeholder="Enter Summary..."
        autosize
        label="Summary"
        minRows={3}
        value={desc}
        onChange={(event) => setDesc(event.currentTarget.value)}
        withAsterisk
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Start date"
          placeholder="Pick date"
          value={startDate}
          onChange={setStartDate}
          maxDate={endDate || undefined}
          withAsterisk
        />
        <MonthPickerInput
          label="End date"
          placeholder="Pick date"
          value={endDate}
          onChange={setEndDate}
          maxDate={new Date()}
          minDate={startDate || undefined}
          withAsterisk
          disabled={checked}
        />
      </div>
      <Checkbox
        label="Currently working here"
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        autoContrast
      />
      <div className="flex gap-5">
        <Button
          variant="outline"
          color="brightSun.4"
          onClick={() => props.setEdit(false)}
        >
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
