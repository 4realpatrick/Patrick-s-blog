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
  // 防止Server返回值有误
  if (!response) return;
  const { success, message, type } = response;
  if (!message) return;
  const { description = "", withTime = true } = options;
  const realDesc = description + withTime ? getRegularTime() : "";
  const toastType = !!type ? type : success ? "success" : "error";
  return toast[toastType](message, {
    description: realDesc,
  });
}
