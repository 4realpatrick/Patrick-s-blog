import { Input, InputProps } from "@/components/ui/input";

export const KeywordFilter: React.FC<InputProps> = (props) => {
  return <Input className="w-[150px] lg:w-[250px] h-8" {...props} />;
};
