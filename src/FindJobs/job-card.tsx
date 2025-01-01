import { Divider, Text } from "@mantine/core";
import { IconBookmark, IconClockHour3 } from "@tabler/icons-react";

const JobCard = ({ jobData }) => {
  return (
    <div className="bg-mine-shaft-900 w-72 p-4 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-mine-shaft-500 transition duration-150">
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
        <IconBookmark className="text-mine-shaft-300 hover:cursor-pointer" />
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
        {" "}
        {jobData.description}
      </Text>
      <Divider size="xs" color="mineShaft.7" />
      <div className="flex justify-between">
        <div className="font-semibold text-mine-shaft-200">
          &#8377;{jobData.package}
        </div>
        <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
          <IconClockHour3 stroke={1.5} className="h-5 w-5" />{" "}
          {jobData.postedDaysAgo} days ago
        </div>
      </div>
    </div>
  );
};

export default JobCard;
