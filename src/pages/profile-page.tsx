import { Divider } from "@mantine/core";
import Profile from "../Profile/Profile";
import { profile } from "../Data/TalentData";


const ProfilePage = () => {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
      <Divider mx={"md"} mb={"xl"} />
      <Profile {...profile}/>
    </div>
  );
};

export default ProfilePage;
