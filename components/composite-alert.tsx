import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
interface ICompositeAlterProps {
  title: string | JSX.Element;
  description?: string;
  className?: string;
}
const CompositeAlert: React.FC<ICompositeAlterProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <Alert className={className}>
      <Terminal className="size-4" />
      <AlertTitle>{title}</AlertTitle>
      {!!description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default CompositeAlert;
