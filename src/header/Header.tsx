import { Avatar, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./nav-links";

const Header = () => {
  return (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-24 flex justify-between items-center">
      <div className="flex gap-3 items-center">
        <img src="./logo_golden.png" alt="LOGO" className="h-14 w-24" />
        {/* <div className="text-3xl font-semibold">Hirrd</div> */}
      </div>
      {<NavLinks />}
      <div className="flex gap-3 items-center">
        <div className="flex items-center gap-2">
          <div>Marshal</div>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            alt="it is me"
          />
        </div>

        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="brightSun.4" offset={5} size={7} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  );
};

export default Header;
