import { Input, InputProps } from "@/components/ui/input";

export const KeywordFilter: React.FC<Omit<InputProps, "ref">> = (props) => {
  return <Input className="w-[150px] lg:w-[250px] h-8" {...props} />;
};
