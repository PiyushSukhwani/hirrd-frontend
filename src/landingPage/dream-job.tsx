import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex items-center px-16">
      <div className="flex flex-col w-[45%] gap-3">
        <div className="text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400">
          Find your <span className="">dream</span> <span>job</span> with us
        </div>
        <div className="text-lg text-mine-shaft-200">
          Good life begins with a good company. Start explore thousands of jobs
          in one place.
        </div>
        <div className="flex gap-3 mt-5">
          <TextInput
            className="bg-mine-shaft-900 rounded-lg py-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100 "
            variant="unstyled"
            radius="md"
            label="Job Title"
            placeholder="Software Engineer"
          />
          <TextInput
            className="bg-mine-shaft-900 rounded-lg py-1 px-2 text-mine-shaft-100 [&_input]:text-mine-shaft-100"
            variant="unstyled"
            radius="md"
            label="Job Type"
            placeholder="Fulltime"
          />

          <div className="flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-xl p-2 hover:bg-bright-sun-500 cursor-pointer ">
            <IconSearch className="h-[85%] w-[85%]" />
          </div>
        </div>
      </div>

      <div className="w-[55%] flex items-center justify-center">
        <div className="w-[30rem] relative">
          <img src="/Boy.png" alt="Boy" />
          <div className="absolute -right-9 w-fit top-[50%] flex flex-col gap-2 border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="text-center mb-1 text-sm text-mine-shaft-100">
              10K+ got job.
            </div>
            <Avatar.Group>
              <Avatar src="/avatar.png" />
              <Avatar src="/avatar2.png" />
              <Avatar src="/avatar1.png" />
              <Avatar>+9k</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute -left-8 w-fit top-[28%] border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md">
            <div className="flex gap-2 items-center mb-1">
              <div className="w-12 h-12 p-1 bg-mine-shaft-900 rounded-lg">
                <img src="/Google.webp" alt="" />
              </div>
              <div className="text-sm text-mine-shaft-100">
                <div>Software Engineer</div>
                <div className="text-mine-shaft-200 text-xs">New York</div>
              </div>
            </div>
            <div className="flex gap-2 justify-around text-mine-shaft-200 text-xs">
              <span>1 day ago</span>
              <span>120 Applicants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJob;
