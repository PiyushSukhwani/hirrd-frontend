import { Button, Divider } from "@mantine/core";
import { IconAward, IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertificateCard from "./CertificateCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../../Services/ProfileService";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id)
      .then((res) => {
        setProfile(res);
      })
      .catch((e) => console.error(e));
  }, [id]);

  return (
    <div className="w-2/3">
      <div className="relative">
        <img src="/Profile/banner.jpg" alt="banner" className="rounded-t-2xl" />
        <img
          src={
            profile.picture && atob(profile.picture) !== "null"
    ? `data:image/jpeg;base64, ${profile.picture}`
    : "/avatar.png"
          }
          alt="banner"
          className="rounded-full !h-48 !w-48 object-cover absolute -bottom-1/3 left-3 border-mine-shaft-950 border-8"
        />
      </div>
      <div className="px-3 mt-16">
        <div className="text-3xl font-semibold flex justify-between">
          {profile?.name}
          <Button color="brightSun.4" variant="light">
            Message
          </Button>
        </div>
        <div className="text-xl flex items-center gap-1">
          <IconBriefcase className="h-5 w-5" />
          {profile?.jobTitle} &bull; {profile?.company}
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
          <IconMapPin className="h-5 w-5" stroke={1.5} />
          {profile?.location}
        </div>
        <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
          <IconAward className="h-5 w-5" stroke={1.5} />
          Experience: {profile?.totalExp} Years
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">About</div>
        <div className="text-sm text-mine-shaft-300 text-justify">
          {profile?.about}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-3">Skills</div>
        <div className="flex flex-wrap gap-2">
          {profile?.skills?.map((skill: string, index: number) => (
            <div
              key={index}
              className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Experience</div>
        <div className="flex flex-col gap-8">
          {profile?.experiences?.map((exp: any, index: number) => (
            <ExpCard key={index} {...exp} />
          ))}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3">
        <div className="text-2xl font-semibold mb-5">Certifications</div>
        <div className="flex flex-col gap-8">
          {profile?.certifications?.map((certi: any, index: number) => (
            <CertificateCard key={index} {...certi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
