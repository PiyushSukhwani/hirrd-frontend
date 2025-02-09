import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalent/talent-card";

const CompanyEmployees = () => {
  return (
    <div className="mt-10 flex flex-wrap gap-10">
      {talents.map(
        (talent, index: number) =>
          index < 6 && <TalentCard talentData={talent} />
      )}
    </div>
  );
};

export default CompanyEmployees;
