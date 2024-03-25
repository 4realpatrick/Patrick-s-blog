"use client";
// Cmp
import { Button } from "@/components/ui/button";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaBackspace } from "react-icons/fa";
import Hint from "@/components/hint";
// Hooks
import { type ElementRef, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
// Utils
import { createPortal } from "react-dom";
// Context
import { DictionaryContext } from "@/components/dictionary-provider";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const { common: commonDictionary } = useContext(DictionaryContext);
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 bg-foreground/50 backdrop-blur flex items-center justify-center z-[1000]">
      <dialog
        ref={dialogRef}
        className="container bg-background p-5 rounded-md scroll-smooth"
        onClose={onDismiss}
      >
        <header className="flex gap-2">
          <Hint descrption={commonDictionary.go_back}>
            <Button
              className="group"
              variant="ghost"
              size="sm"
              onClick={onDismiss}
            >
              <FaBackspace className="size-4 group-hover:text-destructive" />
            </Button>
          </Hint>
          <Hint descrption={commonDictionary.full_screen}>
            <Button onClick={() => location.reload()} variant="ghost" size="sm">
              <BsArrowsFullscreen className="text-green-500" />
            </Button>
          </Hint>
        </header>
        {children}
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}
