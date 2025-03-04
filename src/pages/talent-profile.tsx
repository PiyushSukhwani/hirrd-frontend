import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendedTalent from "../Components/TalentProfile/recommended-talent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfile = () => {
  const { id } = useParams();
  const [talents, setTalents] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProfiles()
      .then((res) => {
        setTalents(res);
      })
      .catch((e) => console.error(e));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Button
        onClick={() => navigate(-1)}
        className="my-5 inline-block"
        color="brightSun.4"
        variant="light"
        leftSection={<IconArrowLeft size={20} />}
      >
        Back
      </Button>
      <div className="flex gap-5">
        <Profile  />
        <RecommendedTalent talents={talents}/>
      </div>
    </div>
  );
};

export default TalentProfile;
