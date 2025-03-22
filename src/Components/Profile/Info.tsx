import { SelectInput } from "./select-input";
import {
  IconAward,
  IconBriefcase,
  IconCheck,
  IconMapPin,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { ActionIcon, NumberInput } from "@mantine/core";
import fields from "../../Data/Profile";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";
import { SuccessNotification } from "../../Services/NotifiationService";
import { updateProfile } from "../../Services/ProfileService";

const Info = () => {
  const select = fields;
  const [edit, setEdit] = useState(false);
  const profile = useSelector((state: any) => state.profile);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({
        jobTitle: profile.jobTitle,
        company: profile.company,
        location: profile.location,
        totalExp: profile.totalExp,
      });
    } else {
      setEdit(false);
    }
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { jobTitle: "", company: "", location: "", totalExp: 0 },
  });

  const handleSave = async () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    let newProfile = await updateProfile(updatedProfile);
    dispatch(changeProfile(newProfile));
    SuccessNotification("Success", "Profile Updated Successfully");
  };

  return (
    <>
      <div className="px-3 mt-24">
        <div className="text-3xl font-semibold flex justify-between mb-3">
          {user?.name}
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
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} form={form} name="jobTitle" />
              <SelectInput {...select[1]} form={form} name="company" />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[2]} form={form} name="location" />
              <NumberInput
                {...form.getInputProps("totalExp")}
                label="Experience"
                withAsterisk
                hideControls
                min={0}
                max={50}
                clampBehavior="strict"
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-xl flex items-center gap-1">
              <IconBriefcase className="h-5 w-5" />
              {profile?.jobTitle} &bull; {profile?.company}
            </div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              {profile?.location}
            </div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
              <IconAward className="h-5 w-5" stroke={1.5} />
              Experience: {profile?.totalExp ? profile.totalExp : 0} Years
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
