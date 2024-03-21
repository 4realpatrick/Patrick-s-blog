import { ICommonResponse } from "@/types";
import { toast } from "sonner";
import { getRegularTime } from "./time";

export default function fetchHandler(
  response: ICommonResponse,
  options: {
    description?: string;
    withTime?: boolean;
    duration?: number;
    callback?: (isSuccess: boolean) => void;
  } = {}
) {
  // 防止Server返回值有误
  if (!response) return;
  const { success, message, type } = response;
  if (!message) return;
  const {
    description = "",
    withTime = true,
    duration = 3000,
    callback,
  } = options;
  const realDesc = description + withTime ? getRegularTime() : "";
  const toastType = !!type ? type : success ? "success" : "error";
  toast[toastType](message, {
    description: realDesc,
    duration,
    onAutoClose(toast) {
      callback?.(success);
    },
  });
}
