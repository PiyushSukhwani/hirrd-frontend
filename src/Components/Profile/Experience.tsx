import { ActionIcon } from "@mantine/core";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { IconPencil, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Experience = () => {
  const [edit, setEdit] = useState(false);
  const [addExp, setAddExp] = useState(false);
  const profile = useSelector((state: any) => state.profile);

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-5 flex justify-between">
        Experience
        <div className="flex gap-2">
          <ActionIcon
            variant="subtle"
            color="brightSun.4"
            size={"lg"}
            onClick={() => setAddExp(true)}
          >
            {<IconPlus className="h-4/5 w-4/5" />}
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            size={"lg"}
            onClick={() => setEdit(!edit)}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {addExp && <ExpInput setEdit={setAddExp} add />}
        {profile?.experiences?.map((exp: any, index: number) => (
          <ExpCard
            key={index}
            index={index}
            setAllEdit={setEdit}
            {...exp}
            edit={edit}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
