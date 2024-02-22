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
      className={cn("text-primary underlineAnimation", className)}
    >
      {children}
    </Link>
  );
};

export default UnderlineLink;
