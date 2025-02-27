import { Badge, Tabs } from "@mantine/core";
import JobDesc from "../JobDesc/JobDesc";
import TalentCard from "../FindTalent/talent-card";

const PostedJobDesc = (props: any) => {
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
            <Tabs variant="outline" radius="lg" defaultValue="overview">
              <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
                <Tabs.Tab value="interviewing">Interviewing</Tabs.Tab>
                <Tabs.Tab value="offered">Offered</Tabs.Tab>
                <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview" className="[&>div]:w-full">
                <JobDesc edit {...props} />
              </Tabs.Panel>

              <Tabs.Panel value="applicants">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {props.applicants
                    ?.filter((x: any) => x.applicationStatus === "APPLIED")
                    ?.slice(0, 6)
                    ?.map((talent: any, index: number) => (
                      <TalentCard {...talent} posted key={index} />
                    ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="interviewing">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {props.applicants
                    ?.filter((x: any) => x.applicationStatus === "INTERVIEWING")
                    ?.slice(0, 6)
                    ?.map((talent: any, index: number) => (
                      <TalentCard {...talent} invited key={index} />
                    ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="offered">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {props.applicants
                    ?.filter((x: any) => x.applicationStatus === "OFFERED")
                    ?.slice(0, 6)
                    ?.map((talent: any, index: number) => (
                      <TalentCard {...talent} key={index} />
                    ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="rejected">
                <div className="mt-10 flex flex-wrap gap-5 justify-around">
                  {props.applicants
                    ?.filter((x: any) => x.applicationStatus === "REJECTED")
                    ?.slice(0, 6)
                    ?.map((talent: any, index: number) => (
                      <TalentCard {...talent} key={index} />
                    ))}
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
