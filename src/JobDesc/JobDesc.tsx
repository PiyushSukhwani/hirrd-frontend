import { ActionIcon, Button, Divider } from "@mantine/core";
import { IconBookmark } from "@tabler/icons-react";
import { card, desc, skills } from "../Data/JobDescData";
//@ts-ignore
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const JobDesc = () => {
  const data = DOMPurify.sanitize(desc);
  return (
    <div className="w-2/3">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-3 bg-mine-shaft-800 rounded-xl">
            <img src={`/Icons/Google.png`} alt="" className="h-14" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-2xl">Software Engineer</div>
            <div className="text-lg text-mine-shaft-300">
              Google &bull; 3 days ago &bull; 48 Applicants
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <Link to="/apply-job">
            <Button color="brightSun.4" variant="light">
              Apply
            </Button>
          </Link>
          <IconBookmark className="text-bright-sun-400 hover:cursor-pointer" />
        </div>
      </div>
      <Divider my={"xl"} />
      <div className="flex justify-between">
        {card.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center gap-1">
            <ActionIcon
              variant="light"
              radius="xl"
              aria-label="Settings"
              className="!h-12 !w-12"
              color="brightSun.4"
            >
              <item.icon className="h-4/5 w-4/5" stroke={1.5} />
            </ActionIcon>
            <div className="text-sm text-mine-shaft-300">{item.name}</div>
            <div className="font-semibold">{item.value}</div>
          </div>
        ))}
      </div>
      <Divider my={"xl"} />
      <div>
        <div className="text-xl font-semibold mb-5">Required Skills</div>
        <div className="flex flex-wrap gap-2">
          {skills.map((item: any, index: number) => (
            <ActionIcon
              key={index}
              variant="light"
              radius="xl"
              aria-label="Settings"
              className="!h-fit !w-fit font-medium !text-sm"
              color="brightSun.4"
              p="xs"
            >
              {item}
            </ActionIcon>
          ))}
        </div>
      </div>
      <Divider my={"xl"} />
      <div
        dangerouslySetInnerHTML={{ __html: data }}
        className="[&_h4]:text-xl [&_h4]:my-5 [&_*]:text-mine-shaft-300 [&_h4]:font-semibold [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400 [&_li]:mb-1"
      ></div>
      <Divider my={"xl"} />
      <div>
        <div className="text-xl font-semibold mb-5">About Company</div>
        <div className="flex justify-between mb-5">
          <div className="flex gap-2 items-center">
            <div className="p-3 bg-mine-shaft-800 rounded-xl">
              <img src={`/Icons/Google.png`} alt="" className="h-8" />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-lg">Google</div>
              <div className="text-mine-shaft-300">10k+ employees</div>
            </div>
          </div>
          <Link to="/">
            <Button color="brightSun.4" variant="light">
              Company Page
            </Button>
          </Link>
        </div>
        <div className="text-mine-shaft-300 text-justify">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          quod facilis. Beatae corrupti architecto officiis, explicabo
          distinctio sed, omnis similique incidunt, vel ipsam qui id odit enim
          corporis? Architecto harum veritatis sapiente similique, deserunt
          doloremque distinctio maxime adipisci tempora doloribus?
        </div>
      </div>
    </div>
  );
};

export default JobDesc;
