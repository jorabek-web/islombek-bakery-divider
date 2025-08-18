import { CiUser } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { TiMessages } from "react-icons/ti";

export const PARKASH_MENU_LIST = [
  {
    icon: <CiUser size={25} />,
    label: "Profil",
    link: "/",
  },

  {
    icon: <IoMdNotifications size={25} />,
    label: "Notification",
    link: "/notification",
  },

  {
    icon: <TiMessages size={25} />,
    label: "Message",
    link: "/messages",
  },
];
