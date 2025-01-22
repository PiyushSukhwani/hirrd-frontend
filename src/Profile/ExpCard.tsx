import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";

const ExpCard = (props: any) => {
  const [edit, setEdit] = useState(false);
  return !edit ? (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Icons/Google.png`} alt="" className="h-7" />
          </div>
          <div className="flex flex-col">
            <div className="font-semibold">{props.title}</div>
            <div className="text-sm text-mine-shaft-300">
              {props.company} &bull; {props.location}
            </div>
          </div>
        </div>
        <div className="text-sm text-mine-shaft-300">
          {props.startDate} - {props.endDate}
        </div>
      </div>
      <div className="text-sm text-mine-shaft-300 text-justify">
        {props.description}
      </div>
      {props.edit && (
        <div className="flex gap-5">
          <Button
            variant="outline"
            color="brightSun.4"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
          <Button variant="light" color="red.8">
            Delete
          </Button>
        </div>
      )}
    </div>
  ) : (
    <ExpInput setEdit={setEdit} />
  );
};

export default ExpCard;
