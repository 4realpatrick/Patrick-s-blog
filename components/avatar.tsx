import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
interface IAvatarProps {
  src: string;
  username?: string;
  className?: string;
}
const avatar: React.FC<IAvatarProps> = ({
  src,
  username = "P",
  className = "",
}) => {
  return (
    <Avatar className={cn("size-24", className)}>
      <AvatarImage src={src} alt="Avatar" />
      <AvatarFallback className="text-lg md:text-xl lg:text-2xl">
        {username.slice(0, 1).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default avatar;
