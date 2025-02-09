import { Divider } from "@mantine/core";
import SearchBar from "../Components/FindTalent/SearchBar";
import Talents from "../Components/FindTalent/Talents";

const FindTalent = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <SearchBar />
      <Divider size="xs" mx="md" />
      <Talents />
      <Divider size="xs" mx="md" />
    </div>
  );
};

export default FindTalent;
