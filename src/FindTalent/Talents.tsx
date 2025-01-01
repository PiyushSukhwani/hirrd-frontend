import { talents } from "../Data/TalentData";
import Sort from "../UI/Sort";
import TalentCard from "./talent-card";

const Talents = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-evenly">
        {
            talents.map((talent) => <TalentCard talentData={talent}/>)
            
        }
      </div>
    </div>
  );
};

export default Talents;
