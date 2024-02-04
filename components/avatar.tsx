"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface IAvatarProps {
  src: string;
  username?: string;
}
const avatar: React.FC<IAvatarProps> = ({ src, username = "P" }) => {
  return (
    <Avatar className="size-[100px]">
      <AvatarImage src={src} alt="Avatar" />
      <AvatarFallback>{username.slice(0, 1).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default avatar;
