import { Button, Divider, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { timeAgo } from "../../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../../Slices/ProfileSlice";

const Card = (props: any) => {
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const handleSaveJob = () => {
    let savedJobs: any[] = Array.isArray(profile.savedJobs)
      ? [...profile.savedJobs]
      : [];

    if (savedJobs?.includes(props.id)) {
      savedJobs = savedJobs?.filter((id: any) => id !== props.id);
    } else {
      savedJobs = [...savedJobs, props.id];
    }
    let updatedProfile = { ...profile, savedJobs: savedJobs };
    dispatch(changeProfile(updatedProfile));
  };
  
  return (
    <div className="bg-mine-shaft-900 w-72 p-4 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 transform hover:-translate-y-0.5">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Icons/${props.company}.png`} alt="" className="h-7" />
          </div>
          <div>
            <div className="font-semibold">{props.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {props.company} &#x2022;{" "}
              {props.applicants?.length > 0 ? props.applicants.length : 0}{" "}
              Applicants
            </div>
          </div>
        </div>
        {profile.savedJobs?.includes(props.id) ? (
          <IconBookmarkFilled
            onClick={handleSaveJob}
            className="text-bright-sun-400"
          />
        ) : (
          <IconBookmark
            onClick={handleSaveJob}
            className="text-mine-shaft-300 hover:cursor-pointer"
          />
        )}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{props.experience}</div>
        <div>{props.jobType}</div>
        <div>{props.location}</div>
      </div>
      <Text
        lineClamp={3}
        className="!text-xs text-justify !text-mine-shaft-300"
      >
        {props.about}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{props.packageOffered}
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />
          {props.applied || props.interviewing
            ? "Applied"
            : props.offered
            ? "Interviewed"
            : "Posted"}{" "}
          {timeAgo(props.postTime)}
        </div>
      </div>
      {props.offered ||
        (props.interviewing && <Divider size="xs" color="mineShaft.7" />)}
      {props.offered && (
        <div className="flex gap-2">
          <Button variant="outline" fullWidth color="brightSun.4">
            Accept
          </Button>
          <Button variant="light" fullWidth color="brightSun.4">
            Reject
          </Button>
        </div>
      )}
      {props.interviewing && (
        <div className="flex gap-1 text-sm items-center">
          <IconCalendarMonth
            className="text-bright-sun-400 h-5 w-5"
            stroke={1.5}
          />{" "}
          Sun, 25 August &bull;{" "}
          <span className="text-mine-shaft-400">10:00 AM</span>
        </div>
      )}
      <Link to={`/jobs/${props.id}`}>
        <Button variant="outline" color="brightSun.4" fullWidth>
          View Jobs
        </Button>
      </Link>
    </div>
  );
};

export default Card;
