import { Avatar, Button, Divider, Tabs } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import AboutComp from "./about-comp";
import CompanyJobs from "./company-jobs";
import CompanyEmployees from "./company-employees";

const Company = () => {

  return (
    <div className="w-3/4">
      <div className="relative">
        <img src="/Profile/banner.jpg" alt="banner" className="rounded-t-2xl" />
        <img
          src="/Icons/Google.png"
          alt="banner"
          className="rounded-3xl bg-mine-shaft-950 h-36 w-36 absolute -bottom-1/4 left-5 p-2 border-mine-shaft-950 border-8"
        />
      </div>
      <div className="px-3 mt-14">
        <div className="text-3xl font-semibold flex justify-between">
          Google
          <Avatar.Group>
            <Avatar src="/avatar.png" />
            <Avatar src="/avatar1.png" />
            <Avatar src="/avatar2.png" />
            <Avatar>+10k</Avatar>
          </Avatar.Group>
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          New York, United States
        </div>
      <Divider my="xl" />
      <div>
        <Tabs variant="outline" radius="lg" defaultValue="first">
            <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400">
                <Tabs.Tab value="about">About</Tabs.Tab>
                <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
                <Tabs.Tab value="employees">Employees</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="about"><AboutComp /></Tabs.Panel>
            <Tabs.Panel value="jobs"><CompanyJobs /></Tabs.Panel>
            <Tabs.Panel value="employees"><CompanyEmployees /></Tabs.Panel>
        </Tabs>
      </div>
      </div>

    </div>
  );
};

export default Company;
