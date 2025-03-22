import { ActionIcon } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

const CompanyCard = (props: any) => {
  return (
    <div>
      <div className="flex justify-between bg-mine-shaft-900 items-center rounded-lg p-2">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-md">
            <img src={`/Icons/${props.name}.png`} alt="" className="h-7" />
          </div>
          <div>
            <div className="font-semibold">{props.name}</div>
            <div className="text-xs text-mine-shaft-300">{props.employees}</div>
          </div>
        </div>
        <ActionIcon color="brightSun.4" variant="subtle">
          <IconExternalLink />
        </ActionIcon>
      </div>
    </div>
  );
};

export default CompanyCard;
