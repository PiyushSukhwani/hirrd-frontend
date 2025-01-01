import { Avatar, Button, Divider, Text } from "@mantine/core";
import { IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const TalentCard = ({ talentData }) => {
  return (
    <div className="bg-mine-shaft-900 w-96 p-4 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-150">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              src={`/${talentData.image}.png`}
              size={"lg"}
              alt=""
              className="h-7"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{talentData.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {talentData.role} &bull; {talentData.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 hover:cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {talentData.topSkills.map((skill: String, index: number) => (
          <div key={index}>{skill}</div>
        ))}
      </div>
      <Text
        lineClamp={3}
        className="!text-xs text-justify !text-mine-shaft-300"
      >
        {talentData.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          {talentData.expectedCtc}
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconMapPin stroke={1.5} className="h-5 w-5" /> {talentData.location}
        </div>
      </div>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1    ">
        <Link to="/talent-profile">
          <Button color="brightSun.4" variant="outline" fullWidth>
            Profile
          </Button>
        </Link>
        <div>
          <Button color="brightSun.4" variant="light" fullWidth>
            Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
