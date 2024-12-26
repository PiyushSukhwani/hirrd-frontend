import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Upload Job", url: "/upload-job" },
    { name: "About us", url: "/about" },
  ];

  const location = useLocation();
  return (
    <div className="flex gap-5 h-full items-center">
      {links.map((link, index) => (
        <div
          key={index}
          className={`${
            location.pathname == link.url
              ? "text-bright-sun-400"
              : "text-mine-shaft-200"
          } h-full flex items-center`}
        >
          <Link
            to={link.url}
            className="relative
             before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px]
             before:bg-bright-sun-400 before:transition-all before:duration-300
             hover:before:w-full before:rounded-full"
          >
            {link.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default NavLinks;
