import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import { useState } from "react";
import { SelectInput } from "./select-input";
import fields from "../Data/Profile";
import ExpCard from "./ExpCard";
import CertificateCard from "./CertificateCard";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";

const Profile = (props: any) => {
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState(props.about);
  const [skills, setSkills] = useState(props.skills);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const select = fields;

  const handleEdit = (index: number) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };
  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img src="/Profile/banner.jpg" alt="banner" className="rounded-t-2xl" />
        <img
          src="/avatar.png"
          alt="banner"
          className="rounded-full h-48 w-48 absolute -bottom-1/3 left-3 border-mine-shaft-950 border-8"
        />
      </div>
      <div className="px-3 mt-24">
        <div className="text-3xl font-semibold flex justify-between">
          {props.name}
          <ActionIcon
            variant="subtle"
            color="brightSun.4"
            size={"lg"}
            onClick={() => handleEdit(0)}
          >
            {edit[0] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[0] ? (
          <>
            <div className="flex gap-10 [&>*]:w-1/2">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <div className="text-xl flex items-center gap-1">
              <IconBriefcase className="h-5 w-5" />
              {props.role} &bull; {props.company}
            </div>
            <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
              <IconMapPin className="h-5 w-5" stroke={1.5} />
              {props.location}
            </div>
          </>
        )}
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          About
          <ActionIcon
            variant="subtle"
            color="brightSun.4"
            size={"lg"}
            onClick={() => handleEdit(1)}
          >
            {edit[1] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[1] ? (
          <Textarea
            value={about}
            onChange={(event) => setAbout(event.currentTarget.value)}
            autosize
            minRows={3}
            placeholder="Enter about yourself..."
          />
        ) : (
          <div className="text-sm text-mine-shaft-300 text-justify">
            {props.about}
          </div>
        )}
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3 flex justify-between">
          Skills
          <ActionIcon
            variant="subtle"
            color="brightSun.4"
            size={"lg"}
            onClick={() => handleEdit(2)}
          >
            {edit[2] ? (
              <IconDeviceFloppy className="h-4/5 w-4/5" />
            ) : (
              <IconPencil className="h-4/5 w-4/5" />
            )}
          </ActionIcon>
        </div>
        {edit[2] ? (
          <TagsInput
            splitChars={[",", " ", "|"]}
            placeholder="Add skills"
            value={skills}
            onChange={setSkills}
          />
        ) : (
          <div className="flex flex-wrap gap-2">
            {props?.skills?.map((skill: string, index: number) => (
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
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Experience{" "}
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
              color="brightSun.4"
              size={"lg"}
              onClick={() => handleEdit(3)}
            >
              {edit[3] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {props?.experience?.map((exp: any, index: number) => (
            <ExpCard key={index} {...exp} edit={edit[3]} />
          ))}
          {addExp && <ExpInput setEdit={setAddExp} add />}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5 flex justify-between">
          Certifications
          <div className="flex gap-2">
            <ActionIcon
              variant="subtle"
              color="brightSun.4"
              size={"lg"}
              onClick={() => setAddCerti(true)}
            >
              {<IconPlus className="h-4/5 w-4/5" />}
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="brightSun.4"
              size={"lg"}
              onClick={() => handleEdit(4)}
            >
              {edit[4] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
        </div>
        <div className="flex flex-col gap-8">
          {props?.certifications?.map((certi: any, index: number) => (
            <CertificateCard key={index} {...certi} edit={edit[4]} />
          ))}
          {
            addCerti && <CertiInput setEdit={setAddCerti} />
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
