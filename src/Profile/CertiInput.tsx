import { Button, TextInput } from "@mantine/core";
import { SelectInput } from "./select-input";
import fields from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";

const CertiInput = (props: any) => {
  const select = fields;
  const [issueDate, setIssueDate] = useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold">Add Certificate</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <TextInput placeholder="Enter title" withAsterisk label="Title" />
        <SelectInput {...select[1]} />
      </div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          label="Issue date"
          placeholder="Pick date"
          value={issueDate}
          onChange={setIssueDate}
          maxDate={new Date()}
          withAsterisk
        />
        <TextInput placeholder="Enter ID" withAsterisk label="Certificate ID" />
      </div>

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

export default CertiInput;
