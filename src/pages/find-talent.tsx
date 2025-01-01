import { Button, Divider } from "@mantine/core";
import SearchBar from "../FindTalent/SearchBar";
import Talents from "../FindTalent/Talents";
import { Link } from "react-router-dom";

const FindTalent = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <Divider size="xs" mx="md" />
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents />
      <Divider size="xs" mx="md" />
    </div>
  );
};

export default FindTalent;
