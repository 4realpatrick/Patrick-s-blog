import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaTerminal } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { IconType } from "react-icons/lib";
interface ICompositeAlterProps {
  title: string | JSX.Element;
  description?: string;
  className?: string;
  icon?: IconType;
}
const CompositeAlert: React.FC<ICompositeAlterProps> = ({
  title,
  description,
  className = "",
  icon = FaTerminal,
}) => {
  return (
    <Alert className={className}>
      {icon({ className: "size-4" })}
      <AlertTitle>{title}</AlertTitle>
      {!!description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default CompositeAlert;
