import { Menu, Avatar, Switch } from "@mantine/core";
import {
  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconMoonStars,
  IconLogout2,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../Slices/UserSlice";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slices/ProfileSlice";

const ProfileMenu = () => {
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);
  const profile = useSelector((state:any) => state.profile)

  const handleLogout = () => {
    dispatch(removeUser());
  };

  console.log(profile);
  

  useEffect(() => {
    getProfile(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Menu
      shadow="md"
      width={200}
      trigger="hover"
      openDelay={150}
      closeDelay={100}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
          <div>{user?.name}</div>
          <Avatar src={
              profile.picture
                ? `data:image/jpeg;base64, ${profile.picture}`
                : "/avatar.png"
            } alt="it is me" />
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <Link to={"/profile"}>
          <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
          </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>Resume</Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch
              size="md"
              color="dark.4"
              onLabel={<IconSun size={16} stroke={2.5} color="yellow" />}
              offLabel={<IconMoonStars size={16} stroke={2.5} color="cyan" />}
              checked={checked}
              onChange={(event) => setChecked(event.currentTarget.checked)}
            />
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          onClick={handleLogout}
          color="red"
          leftSection={<IconLogout2 size={14} />}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
