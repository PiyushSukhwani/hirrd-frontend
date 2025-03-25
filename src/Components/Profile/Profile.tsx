import { Avatar, Divider, FileInput, Overlay } from "@mantine/core";
import { useEffect } from "react";
import { getProfile, updateProfile } from "../../Services/ProfileService";
import { useDispatch, useSelector } from "react-redux";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slices/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { SuccessNotification } from "../../Services/NotifiationService";
import { getBase64 } from "../../Services/Utilities";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);
  const { hovered, ref } = useHover();

  const handleFileChange = async (image: any) => {
    let picture: any = await getBase64(image);
    let updatedPicture = { ...profile, picture: picture.split(",")[1] };
    dispatch(changeProfile(updatedPicture));
    SuccessNotification("Success", "Profile picture updated successfully");
    await updateProfile(updatedPicture);
  };

  useEffect(() => {
    getProfile(user?.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img src="/Profile/banner.jpg" alt="banner" className="rounded-t-2xl" />
        <div
          className="absolute flex items-center justify-center -bottom-1/3 left-3"
          ref={ref}
        >
          <Avatar
            src={
              profile.picture && atob(profile.picture) !== "null"
                ? `data:image/jpeg;base64, ${profile.picture}`
                : "/avatar.png"
            }
            alt="banner"
            className="rounded-full !h-48 !w-48 border-mine-shaft-950 border-8"
          />
          {hovered && (
            <Overlay
              className="!rounded-full"
              color="#000"
              backgroundOpacity={0.75}
            />
          )}
          {hovered && <IconEdit className="absolute z-[300] !w-16 !h-16" />}
          {hovered && (
            <FileInput
              variant="transparent"
              className="absolute [&_*]:!h-full !h-full !w-full z-[350] [&_*]:!rounded-full"
              size="lg"
              radius={"xl"}
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          )}
        </div>
      </div>
      <Info />
      <Divider mx="xs" my="xl" />
      <About />
      <Divider mx="xs" my="xl" />
      <Skills />
      <Divider mx="xs" my="xl" />
      <Experience />
      <Divider mx="xs" my="xl" />
      <Certificate />
    </div>
  );
};

export default Profile;
