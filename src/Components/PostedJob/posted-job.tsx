import { Tabs } from "@mantine/core";
import { activeJobs } from "../../Data/PostedJob";
import PostedJobCard from "./PostedJobCard";

const PostedJob = () => {
  return (
    <div className="w-1/6 mt-5">
      <div className="text-2xl font-semibold mb-5">Jobs</div>
      <div>
        <Tabs variant="pills" defaultValue="active">
          <Tabs.List className=" font-medium [&_button[aria-selected='false']]:bg-mine-shaft-900">
            <Tabs.Tab value="active">Active [4]</Tabs.Tab>
            <Tabs.Tab value="draft">Draft [1]</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="active">
            <div className="flex flex-col gap-5 mt-5">
              {activeJobs.map((item, index: number) => (
                <PostedJobCard key={index} {...item} />
              ))}
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="draft">s</Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default PostedJob;
