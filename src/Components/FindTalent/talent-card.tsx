import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { DateInput, TimeInput } from "@mantine/dates";
import { useRef, useState } from "react";

interface TalentData {
  image: String;
  name: String;
  role: String;
  company: String;
  topSkills: String[];
  about: String;
  expectedCtc: String;
  location: String;
}

const TalentCard: React.FC<{
  talentData: TalentData;
  posted: boolean;
  invited: boolean;
}> = ({ talentData, posted, invited }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date | null>(null);
  const ref = useRef<HTMLInputElement>(null);
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
      {invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview: August 27, 2024 10:00 AM
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-200">
            {talentData.expectedCtc}
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPin stroke={1.5} className="h-5 w-5" />{" "}
            {talentData.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!invited && (
          <>
            <Link to="/talent-profile">
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {posted ? (
                <Button
                  color="brightSun.4"
                  variant="light"
                  fullWidth
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>
                  Message
                </Button>
              )}
            </div>
          </>
        )}
        {invited && (
          <>
            <div>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Accept
              </Button>
            </div>
            <div>
              <Button color="brightSun.4" variant="light" fullWidth>
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      <Modal
        onClose={close}
        opened={opened}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={value}
            onChange={setValue}
            label="Date"
            placeholder="Enter date"
            minDate={new Date()}
          />
          <TimeInput
            label="Time"
            onClick={() => ref.current?.showPicker()}
            ref={ref}
          />
          <Button variant="light" color="brightSun.4" fullWidth>
            Schedule
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
