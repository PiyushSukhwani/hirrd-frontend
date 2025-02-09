import { Button, Divider, Text } from "@mantine/core";
import {
  IconBookmark,
  IconBookmarkFilled,
  IconCalendarMonth,
  IconClockHour3,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

type cardProps = {
  jobData: any;
  applied: boolean;
  saved: boolean;
  offered: boolean;
  interviewing: boolean;
};
const Card: React.FC<cardProps> = ({
  jobData,
  applied = false,
  saved = false,
  offered = false,
  interviewing = false,
}) => {
  return (
    <Link
      to="/jobs"
      className="bg-mine-shaft-900 w-72 p-4 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 transition duration-300 transform hover:-translate-y-0.5"
    >
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Icons/${jobData.company}.png`} alt="" className="h-7" />
          </div>
          <div>
            <div className="font-semibold">{jobData.jobTitle}</div>
            <div className="text-xs text-mine-shaft-300">
              {jobData.company} &#x2022; {jobData.applicants} Applicants
            </div>
          </div>
        </div>
        {saved ? (
          <IconBookmarkFilled className="text-bright-sun-400" />
        ) : (
          <IconBookmark className="text-mine-shaft-300 hover:cursor-pointer" />
        )}
      </div>
      <div className="flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs">
        <div>{jobData.experience}</div>
        <div>{jobData.jobType}</div>
        <div>{jobData.location}</div>
      </div>
      <Text
        lineClamp={3}
        className="!text-xs text-justify !text-mine-shaft-300"
      >
        {jobData.description}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{jobData.package}
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />
          {applied || interviewing ? "Applied" : offered ? "Interviewed" : "Posted"}{" "}
          {jobData.postedDaysAgo} days ago
        </div>
      </div>
      {offered || interviewing && <Divider size="xs" color="mineShaft.7" />}
      {offered && (
        <div className="flex gap-2">
          <Button variant="outline" fullWidth color="brightSun.4">
            Accept
          </Button>
          <Button variant="light" fullWidth color="brightSun.4">
            Reject
          </Button>
        </div>
      )}
      {
        interviewing && <div className="flex gap-1 text-sm items-center">
        <IconCalendarMonth className="text-bright-sun-400 h-5 w-5" stroke={1.5} /> Sun, 25 August &bull; <span className="text-mine-shaft-400">10:00 AM</span> 
      </div>
      }
    </Link>
  );
};

export default Card;
