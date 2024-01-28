import { ICommonResponse } from "@/types";
import { toast } from "sonner";
import getRegularTime from "./get-regular-time";

export default function fetchHandler(
  response: ICommonResponse,
  options: {
    description?: string;
    withTime?: boolean;
  } = {}
) {
  const { success, message, type } = response;
  // 防止Server返回值有误
  if (!type || !message) return;
  const { description = "", withTime = true } = options;
  const realDesc = description + withTime ? getRegularTime() : "";
  const toastType = !!type ? type : success ? "success" : "error";
  return toast[toastType](message, {
    description: realDesc,
  });
}
