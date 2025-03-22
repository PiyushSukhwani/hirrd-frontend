import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/talent-card";
import { useEffect, useState } from "react";

const PostedJobDesc = (props: any) => {
  const [tab, setTab] = useState("overview");
  const [arr, setArr] = useState<any>([]);

  const handleTabChange = (value: any) => {
    setTab(value);
    if (value === "applicants") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "APPLIED")
      );
    } else if (value === "invited") {
      setArr(
        props.applicants?.filter(
          (x: any) => x.applicationStatus === "INTERVIEWING"
        )
      );
    } else if (value === "offered") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "OFFERED")
      );
    } else if (value === "rejected") {
      setArr(
        props.applicants?.filter((x: any) => x.applicationStatus === "REJECTED")
      );
    }
  };

  useEffect(() => {
    handleTabChange("overview");
  }, [props]);

  return (
    <div className="mt-5 w-3/4 px-5">
      {props.jobTitle ? (
        <>
          <div className="text-2xl font-semibold flex items-center">
            {props.jobTitle}{" "}
            <Badge variant="light" color="brightSun.4" ml="sm" size="sm">
              {props.jobStatus}
            </Badge>
          </div>
          <div className="font-medium text-mine-shaft-300 mb-5">
            {props.location}
          </div>

          <div>
            <Tabs
              variant="outline"
              radius="lg"
              value={tab}
              onChange={handleTabChange}
            >
              <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="interviewing">Interviewing</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDesc edit {...props} closed={props.jobStatus == "CLOSED"} />
              </Tabs.Panel>

              <Tabs.Panel value="applicants">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr
                      .slice(0, 6)
                      ?.map((talent: any, index: number) => (
                        <TalentCard {...talent} posted key={index} />
                      ))
                  ) : (
                    <div className="font-semibold text-3xl">No Applicants </div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="interviewing">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr
                      .slice(0, 6)
                      ?.map((talent: any, index: number) => (
                        <TalentCard {...talent} invited key={index} />
                      ))
                  ) : (
                    <div className="font-semibold text-3xl">
                      No Invited Candidates{" "}
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr
                      .slice(0, 6)
                      ?.map((talent: any, index: number) => (
                        <TalentCard {...talent} key={index} />
                      ))
                  ) : (
                    <div className="font-semibold text-3xl">
                      No Offered Candidates{" "}
                    </div>
                  )}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {arr?.length ? (
                    arr
                      .slice(0, 6)
                      ?.map((talent: any, index: number) => (
                        <TalentCard {...talent} key={index} />
                      ))
                  ) : (
                    <div className="font-semibold text-3xl">
                      No Rejected Candidates
                    </div>
                  )}
                </div>
              </Tabs.Panel>
            </Tabs>
          </div>
        </>
      ) : (
        <div className="flex text-4xl font-bold min-h-[70vh] text-bright-sun-400 justify-center items-center">
          No Job Selected
        </div>
      )}
    </div>
  );
};

export default PostedJobDesc;
