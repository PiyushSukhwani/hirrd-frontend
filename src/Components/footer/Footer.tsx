import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return location.pathname != "/signup"  && location.pathname !== "/login" ? (
    <div className="pt-20 pb-5 flex gap-5 justify-around bg-mine-shaft-950 font-['poppins']">
      <div className="w-1/4 flex flex-col gap-4">
        <div className="flex gap-1 items-center">
          <img src="/logo_golden.png" alt="LOGO" className="h-12 w-20" />
        </div>
        <div className="text-sm text-mine-shaft-300">
          Job portal with user profilesm skill updates, certifications, work
          experience and admin job postings.
        </div>
        <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-900 [&>div]:p-2 [&>div]:rounded-full hover:[&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700">
          <div>
            <IconBrandFacebook />
          </div>
          <div>
            <IconBrandInstagram />
          </div>
          <div>
            <IconBrandX />
          </div>
        </div>
      </div>
      {footerLinks.map((item, index) => (
        <div key={index}>
          <div className="font-lg font-semibold mb-4 text-bright-sun-400">
            {item.title}
          </div>
          {item.links.map((link, index) => (
            <div
              key={index}
              className="text-mine-shaft-300 text-sm hover:text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out hover:underline"
            >
              {link}
            </div>
          ))}
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default Footer;
