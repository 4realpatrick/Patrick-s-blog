"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const OperateBtn = () => {
  const router = useRouter();
  return (
    <div className="space-x-8">
      <Button size="lg" onClick={router.back}>
        返回上一页
      </Button>
      <Button size="lg" onClick={() => router.push("/")}>
        首页
      </Button>
    </div>
  );
};

export default OperateBtn;
