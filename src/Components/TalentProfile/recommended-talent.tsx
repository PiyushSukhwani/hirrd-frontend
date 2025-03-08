import { useParams } from "react-router-dom";
import TalentCard from "../FindTalent/talent-card";
import { useSelector } from "react-redux";

const RecommendedTalent = (props: any) => {
  const {id} = useParams()
  const profile = useSelector((state:any) => state.profile)
  return (
    <div>
      <div className="text-xl font-semibold mb-5">Recommended Talents</div>
      <div className="flex flex-col flex-wrap gap-5 justify-between">
        {props.talents?.map(
          (talent: any, index: number) =>
            index < 4 && (talent.id != profile.id && talent.id != id) && <TalentCard key={index} {...talent} />
        )}
      </div>
    </div>
  );
};

export default RecommendedTalent;
