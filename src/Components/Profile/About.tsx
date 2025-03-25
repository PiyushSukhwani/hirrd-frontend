import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Services/NotifiationService";
import { updateProfile } from "../../Services/ProfileService";

const About = () => {
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState("");
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      setAbout(profile.about);
    } else {
      setEdit(false);
    }
  };

  const handleSave = async () => {
    dispatch(changeProfile({ ...profile, about: about }));
    SuccessNotification("Success", "About updated successfully!");
    setEdit(false);
    await updateProfile({ ...profile, about: about });
  };

  return (
    <div className="px-3">
      <div className="text-2xl font-semibold mb-3 flex justify-between">
        About
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
        <Textarea
          value={about}
          onChange={(event) => setAbout(event.currentTarget.value)}
          autosize
          minRows={3}
          placeholder="Enter about yourself..."
        />
      ) : (
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      )}
    </div>
  );
};

export default About;
