import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendedTalent from "../TalentProfile/recommended-talent";

const TalentProfile = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4">
      <Divider size="xs" />
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
        <Profile profileData={profile} />
        <RecommendedTalent />
      </div>
    </div>
  );
};

export default TalentProfile;
