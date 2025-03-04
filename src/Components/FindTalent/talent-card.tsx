import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../../Services/ProfileService";
import { changeApplStatus } from "../../Services/JobService";
import {
  ErrorNotification,
  SuccessNotification,
} from "../../Services/NotifiationService";
import { formatInterviewTime, openResume } from "../../Services/Utilities";

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<any>({});
  const { id } = useParams();

  useEffect(() => {
    if (props.applicantId) {
      getProfile(props.applicantId)
        .then((res) => setProfile(res))
        .catch((e) => console.error(e));
    } else {
      setProfile(props);
    }
  }, [props.applicantId]);

  const handleOffer = (status: string) => {
    let interview: {} = {
      id,
      applicantId: profile?.id,
      applicationStatus: status,
    };

    if (status == "INTERVIEWING") {
      const [hours, minutes] = time.split(":").map(Number);
      date?.setHours(hours, minutes);
      interview = { ...interview, interviewTime: date };
    }
    changeApplStatus(interview)
      .then(() => {
        if (status == "INTERVIEWING") {
          SuccessNotification(
            "Interview Scheduled",
            "Interview Scheduled Successfully."
          );
        } else if (status == "OFFERED") {
          SuccessNotification(
            "Job Offer Sent",
            "You have successfully sent a job offer to the candidate."
          );
        } else {
          SuccessNotification(
            "Candidate Rejected",
            "You have successfully rejected the candidate."
          );
        }
        window.location.reload();
      })
      .catch((err) => {
        ErrorNotification("Error", err.response.data.errorMessage);
      });
    close();
  };

  return (
    <div className="bg-mine-shaft-900 w-96 p-4 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar
              src={
                profile.picture
                  ? `data:image/jpeg;base64,${profile.picture}`
                  : "/Avatar.png"
              }
              size={"lg"}
              alt="profile picture"
              className="h-7"
            />
          </div>
          <div>
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300">
              {profile.jobTitle} &bull; {profile.company}
            </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 hover:cursor-pointer" />
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        {profile.skills?.map(
          (skill: String, index: number) =>
            index < 4 && <div key={index}>{skill}</div>
        )}
      </div>
      <Text
        lineClamp={3}
        className="!text-xs text-justify !text-mine-shaft-300"
      >
        {profile.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview:{" "}
          {formatInterviewTime(props.interviewTime)}
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-normal text-mine-shaft-300">
            Exp: {props.totalExp} Years
          </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPin stroke={1.5} className="h-5 w-5" /> {profile.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />
      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && (
          <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>
                Profile
              </Button>
            </Link>
            <div>
              {props.posted ? (
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
        {props.invited && (
          <>
            <div>
              <Button
                color="brightSun.4"
                variant="outline"
                fullWidth
                onClick={() => handleOffer("OFFERED")}
              >
                Accept
              </Button>
            </div>
            <div>
              <Button
                color="brightSun.4"
                variant="light"
                fullWidth
                onClick={() => handleOffer("REJECTED")}
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </div>
      {(props.invited || props.posted) && (
        <Button
          color="brightSun.4"
          variant="filled"
          fullWidth
          autoContrast
          onClick={openApp}
        >
          View Application
        </Button>
      )}
      <Modal
        onClose={close}
        opened={opened}
        title="Schedule Interview"
        centered
      >
        <div className="flex flex-col gap-4">
          <DateInput
            value={date}
            onChange={setDate}
            label="Date"
            placeholder="Enter date"
            minDate={new Date()}
          />
          <TimeInput
            value={time}
            onChange={(event) => setTime(event.currentTarget.value)}
            label="Time"
            onClick={() => ref.current?.showPicker()}
            ref={ref}
          />
          <Button
            variant="light"
            color="brightSun.4"
            fullWidth
            onClick={() => handleOffer("INTERVIEWING")}
          >
            Schedule
          </Button>
        </div>
      </Modal>
      <Modal onClose={closeApp} opened={app} title="Application" centered>
        <div className="flex flex-col gap-4">
          <div>
            Email: &emsp;
            <a
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={`mailto:${props.email}`}
            >
              {props.email}
            </a>
          </div>
          <div>
            Website: &emsp;
            <a
              target="_blank"
              className="text-bright-sun-400 hover:underline cursor-pointer text-center"
              href={props.website}
            >
              {props.website}
            </a>
          </div>
          <div>
            Resume: &emsp;{" "}
            <span
              className="text-bright-sun-400 text-center cursor-pointer hover:underline"
              onClick={() => openResume(props.resume)}
            >
              {props.name}
            </span>
          </div>
          <div>
            CoverLetter: &emsp; <div>{props.coverLetter}</div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;
