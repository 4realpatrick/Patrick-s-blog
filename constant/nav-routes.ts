import { MdArticle } from "react-icons/md";
import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { SiAboutdotme } from "react-icons/si";
import { TDictionary } from "@/lib/dictionary";
import { CgProfile } from "react-icons/cg";

export const getNavRoutes = (
  dictionary: TDictionary["components"]["navbar"]["routes"]
) => {
  const navRoutes = [
    {
      icon: MdArticle,
      href: "/blog",
    },
    {
      icon: AiOutlineFundProjectionScreen,
      href: "/project",
    },
    {
      icon: CgProfile,
      href: "/about",
    },
  ];
  return navRoutes.map((route, index) => ({
    ...route,
    title: dictionary[index],
  }));
};
