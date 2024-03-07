"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { BsArrowsFullscreen } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center z-[1000]">
      <dialog
        ref={dialogRef}
        className="w-4/5 max-h-[80%] h-4/5 bg-background p-5 rounded-md"
        onClose={onDismiss}
      >
        <header className="flex gap-2 justify-end">
          <Button
            onClick={() => location.reload()}
            variant="ghost"
            className=""
          >
            <BsArrowsFullscreen className="text-green-500" />
          </Button>
          <Button onClick={onDismiss} variant="ghost" className="">
            <IoIosCloseCircle className="text-destructive size-full" />
          </Button>
        </header>
        <div>{children}</div>
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
