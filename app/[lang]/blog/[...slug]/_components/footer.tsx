"use client";
// Hooks
import { useRouter } from "next/navigation";

export const BlogFooter = ({ slug }: { slug: string[] | string }) => {
  const router = useRouter();
  return (
    <div className="mx-auto flex items-center justify-between">
      <span
        className=" text-2xl font-mono font-semibold underlineAnimation cursor-pointer"
        onClick={() => router.back()}
      >
        cd ..
      </span>
    </div>
  );
};
