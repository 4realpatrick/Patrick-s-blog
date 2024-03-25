import { cn } from "@/lib/utils";
import React, { memo } from "react";
export type TOrientation = "left" | "center" | "right";
interface ISeparatorProps {
  children?: React.ReactNode;
  useTheme?: boolean;
  className?: string;
}
const Separator: React.FC<ISeparatorProps> = memo(
  ({ children, useTheme = true, className }) => {
    return (
      <div
        className={cn(
          "flex whitespace-nowrap select-none before:relative before:border-t-[1px] before:flex-1 after:relative after:border-cyan-500 after:border-t-[1px] after:flex-1 items-center",
          useTheme
            ? "before:border-primary after:border-primary"
            : "before:border-border after:border-border",
          className
        )}
      >
        {children && (
          <div className="inline-block px-4 text-sm">{children}</div>
        )}
      </div>
    );
  }
);

Separator.displayName = "Separator";

export default Separator;
