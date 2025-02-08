import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

const SuccessNotification = (title: string, message: string) => {
  return notifications.show({
    title,
    message,
    icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
    color: "teal",
    withBorder: true,
    withCloseButton: true,
    className: "!border-green-500 !mb-2",
  });
};
const ErrorNotification = (title: string, message: string) => {
  return notifications.show({
    title,
    message,
    icon: <IconX style={{ width: "90%", height: "90%" }} />,
    color: "red",
    withBorder: true,
    withCloseButton: true,
    className: "!border-red-500 !mb-2",
  });
};

export { SuccessNotification, ErrorNotification };
