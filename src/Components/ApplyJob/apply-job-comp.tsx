import { Divider } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../../Services/Utilities";

const ApplyJobComp = (props: any) => {
  return (
    <div className="w-2/3 mx-auto">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img src={`/Icons/${props.company}.png`} alt="" className="h-14" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300">
              {props.company} &bull; {timeAgo(props.postTime)} &bull;{" "}
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
      </div>
      <Divider my="xl" />
      <ApplicationForm />
    </div>
  );
  {
    /* <Notification
    className={`!border-bright-sun-400 !fixed top-0 left-[35%] !z-[1005]  transition duration-300 ease-in-out ${
      submit ? "translate-y-0" : "-translate-y-20"
    }`}
    icon={<CheckIcon style={{ width: rem(20), height: rem(20) }} />}
    color="teal"
    title="Application Submitted!"
    mt="md"
    withBorder
    withCloseButton={false}
  >
    Redirecting to Find Jobs in {sec} seconds...
  </Notification> */
  }
};

export default ApplyJobComp;
