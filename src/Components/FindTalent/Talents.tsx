import { useEffect, useState } from "react";
import Sort from "../UI/Sort";
import TalentCard from "./talent-card";
import { getAllProfiles } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import { resetFilter } from "../../Slices/FilterSlice";

const Talents = () => {
  const [talents, setTalents] = useState<any>([]);
  const filter = useSelector((state: any) => state.filter);
  const [filteredTalents, setFilteredTalents] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilter());
    window.scrollTo(0, 0);
    getAllProfiles()
      .then((res) => setTalents(res))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filterTalent = talents;

    if (filter.name) {
      filterTalent = filterTalent.filter((talent: any) =>
        talent.name.toLowerCase().includes(filter.name.toLowerCase())
      );
    }

    if (filter["Job Title"] && filter["Job Title"].length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter["Job Title"]?.some((title: any) =>
          talent.jobTitle.toLowerCase().includes(title.toLowerCase())
        )
      );
    }

    if (filter.Location && filter.Location.length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Location.some((location: string) =>
          talent.location.toLowerCase().includes(location.toLowerCase())
        )
      );
    }

    if (filter.Skills && filter.Skills.length > 0) {
      filterTalent = filterTalent.filter((talent: any) =>
        filter.Skills.some((filterSkill: any) =>
          talent?.skills.some(
            (skill: any) => skill.toLowerCase() === filterSkill.toLowerCase()
          )
        )
      );
    }

    if (filter.exp && filter.exp?.length > 0) {
      filterTalent = filterTalent.filter(
        (talent: any) =>
          talent.totalExp >= filter.exp[0] && talent.totalExp <= filter.exp[1]
      );
    }

    setFilteredTalents(filterTalent);
  }, [filter, talents]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <div className="text-2xl font-semibold">Recommended Jobs</div>
        <Sort />
      </div>
      <div className="mt-10 flex flex-wrap gap-5 justify-evenly">
        {filteredTalents.length ? (
          filteredTalents.map((talent: any, index: number) => (
            <TalentCard {...talent} key={index} />
          ))
        ) : (
          <div className="text-bright-sun-400 font-semibold text-3xl">
            No Talent found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Talents;
