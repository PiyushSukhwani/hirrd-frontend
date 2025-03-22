import { Indicator, Menu, Notification, rem } from "@mantine/core";
import { IconBell, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getNoti, readNoti } from "../../Services/NotiService";
import { useNavigate } from "react-router-dom";

const NotificationMenu = () => {
  const [opened, setOpened] = useState(false);
  const user = useSelector((state: any) => state.user);
  const [notifications, setNotifications] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user)
      getNoti(user?.id)
        .then((res) => {
          setNotifications(res);
        })
        .catch((err) => console.log(err));
  }, [user]);

  const unRead = (index: number) => {
    let notis = [...notifications];
    notis = notis.filter((_: any, i: number) => i != index);
    setNotifications(notis);

    readNoti(notifications[index].id).catch((e) => console.error(e));
  };

  return (
    <Menu
      shadow="md"
      width={400}
      trigger="hover"
      openDelay={150}
      closeDelay={100}
      opened={opened}
      onChange={setOpened}
    >
      <Menu.Target>
        <div className="bg-mine-shaft-900 p-1.5 rounded-full">
          <Indicator
            disabled={notifications?.length <= 0}
            color="brightSun.4"
            offset={5}
            size={7}
            processing
          >
            <IconBell stroke={1.5} />
          </Indicator>
        </div>
      </Menu.Target>

      <Menu.Dropdown onChange={() => setOpened(true)}>
        <div className="flex flex-col gap-1">
          {notifications?.length > 0 ? (
            notifications.map((noti: any, index: number) => (
              <Notification
                onClick={() => {
                  navigate(noti.route);
                  unRead(index);
                  setOpened(false);
                }}
                key={index}
                onClose={() => unRead(index)}
                className="w-full h-full hover:bg-mine-shaft-900 hover:cursor-pointer"
                icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />}
                color="teal"
                title={noti.action}
              >
                {noti.message}
              </Notification>
            ))
          ) : (
            <div className="text-center text-bright-sun-300 font-medium p-2">
              No Notifications
            </div>
          )}
        </div>
      </Menu.Dropdown>
    </Menu>
  );
};

export default NotificationMenu;
