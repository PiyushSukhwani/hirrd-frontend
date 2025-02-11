import { Button, Indicator } from "@mantine/core";
import { IconBell, IconSettings } from "@tabler/icons-react";
import NavLinks from "./nav-links";
import { Link, useLocation } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const user = useSelector((state: any) => state.user);

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="w-full bg-mine-shaft-950 px-6 text-white h-24 flex justify-between items-center font-['poppins']">
      <div className="flex gap-3 items-center">
        <Link to={"/"}>
          <img src="./logo_golden.png" alt="LOGO" className="h-14 w-24" />
        </Link>
      </div>
      {<NavLinks />}
      <div className="flex gap-3 items-center">
        {user ? (
          <ProfileMenu />
        ) : (
          <Link to={"/login"}>
            <Button variant="subtle" color="brightSun.4">
              Login
            </Button>
          </Link>
        )}
        {/* <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <IconSettings stroke={1.5} />
        </div> */}
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator color="brightSun.4" offset={5} size={7} processing>
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Header;
