import { cn } from "@/lib/utils";
import React, { memo } from "react";
export type TOrientation = "left" | "center" | "right";
interface ISeparatorProps {
  children?: React.ReactNode;
  isUsingTheme?: boolean;
  className?: string;
}
const Separator: React.FC<ISeparatorProps> = memo(
  ({ children, isUsingTheme = true, className }) => {
    return (
      <div
        className={cn(
          "flex whitespace-nowrap select-none before:relative before:top-1/2 before:border-t-[1px] before:translate-y-1/2 before:grow after:relative after:top-1/2 after:border-cyan-500 after:border-t-[1px] after:translate-y-1/2 after:grow",
          isUsingTheme
            ? "before:border-primary after:border-primary"
            : "before:border-foreground after:border-foreground",
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

export default Separator;