import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/talent-card";

const RecommendedTalent = () => {
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Talents</div>
      <div className="flex flex-col flex-wrap gap-5 justify-between">
        {talents.map((talent, index: number) => (index < 4 &&
          <TalentCard key={index} talentData={talent} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedTalent;
