"use client";
import { useRouter } from "next/navigation";
import { Modal } from "./modal";
import { Button } from "@/components/ui/button";

export default function ArticleModal({
  params: { id: articleId },
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const handleModalVisibleChange = (visible: boolean) => {
    if (!visible) {
      router.back();
    }
  };

  return <Modal>{articleId}</Modal>;
}
