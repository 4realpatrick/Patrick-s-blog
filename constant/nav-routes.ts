import { FaCss3 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { TDictionary } from "@/lib/dictionary";
export const getNavRoutes = (
  dictionary: TDictionary["components"]["navbar"]["routes"]
) => {
  const navRoutes = [
    {
      icon: FaCss3,
      href: "/css",
    },
    {
      icon: IoLogoJavascript,
      href: "/js",
    },
  ];
  return navRoutes.map((route, index) => ({
    ...route,
    title: dictionary[index],
  }));
};
