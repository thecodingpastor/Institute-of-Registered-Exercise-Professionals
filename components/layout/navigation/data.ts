import { FaUsers } from "react-icons/fa";
import { AiFillEdit, AiOutlineMail } from "react-icons/ai";
import { GiShoppingBag } from "react-icons/gi";
import { MdCall } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";

export const NavData = [
  {
    href: "mailto: ireplearning@gmail.com",
    title: "Email",
    icon: AiOutlineMail,
  },
  {
    href: "tel:09025868678",
    title: "Call Us",
    icon: MdCall,
  },
  {
    href: "tel:09025868678",
    title: "WhatsApp",
    icon: BsWhatsapp,
  },
  {
    href: "/team",
    title: "Our Team",
    icon: FaUsers,
  },
];

export const AuthNavData = [
  {
    href: "/users",
    title: "Users",
    icon: FaUsers,
    isAdmin: true,
  },
  {
    href: "/orders",
    title: "Orders",
    icon: GiShoppingBag,
  },
  {
    href: "/course/create",
    title: "Create Course",
    icon: AiFillEdit,
  },
  {
    href: "/",
    title: "Logout",
    icon: BiLogOutCircle,
  },
];
