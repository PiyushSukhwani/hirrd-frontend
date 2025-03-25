import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SuccessNotification } from "../../Services/NotifiationService";
import { changeProfile } from "../../Slices/ProfileSlice";
import { updateProfile } from "../../Services/ProfileService";

const Skills = () => {
  const [edit, setEdit] = useState(false);
  const [skills, setSkills] = useState<string[]>([]);
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setSkills(profile.skills);
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    dispatch(changeProfile({ ...profile, skills: skills }));
    SuccessNotification("Success", "Skills updated successfully!");
    setEdit(false);
    await updateProfile({ ...profile, skills: skills });
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        Skills
        <div>
          {edit && (
            <ActionIcon
              variant="subtle"
              color="green.8"
              size={"lg"}
              onClick={() => handleSave()}
            >
              <IconCheck className="h-4/5 w-4/5" />
            </ActionIcon>
          )}
          <ActionIcon
            variant="subtle"
            color={edit ? "red.8" : "brightSun.4"}
            size={"lg"}
            onClick={() => handleClick()}
          >
            {edit ? (
              <IconX className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
      </div>
      {edit ? (
        <TagsInput
          splitChars={[",", " ", "|"]}
          placeholder="Add skills"
          value={skills}
          onChange={setSkills}
        />
      ) : (
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: string, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Skills;
