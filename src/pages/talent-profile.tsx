import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendedTalent from "../Components/TalentProfile/recommended-talent";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";

const TalentProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((e) => console.error(e));
  }, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Link to="/find-talent" className="my-5 inline-block">
        <Button
          color="brightSun.4"
          variant="light"
          leftSection={<IconArrowLeft size={20} />}
        >
          Back
        </Button>
      </Link>
      <div className="flex gap-5">
        <Profile {...profile} />
        <RecommendedTalent />
      </div>
    </div>
  );
};

export default TalentProfile;
