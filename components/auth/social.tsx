"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { Button } from "../ui/button";

const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="size-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline">
        <FaGithub className="size-5" />
      </Button>
      <Button size="lg" className="w-full" variant="outline">
        <FaDiscord className="size-5 text-[#5a65ec]" />
      </Button>
    </div>
  );
};

export default Social;
