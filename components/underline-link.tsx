import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React from "react";

const UnderlineLink: React.FC<
  LinkProps & { children: React.ReactNode; className?: string }
> = (props) => {
  const { children, className = "", ...rest } = props;
  return (
    <Link
      {...rest}
      className={cn(
        "text-primary bg-[0%_100%] bg-no-repeat transition-[background-size] duration-200 ease-linear bg-[length:0%_2px] hover:bg-[length:100%_2px] bg-gradient-to-tr from-primary to-primary",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default UnderlineLink;
