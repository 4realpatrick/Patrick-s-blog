import { ToastT } from "sonner";

export enum EStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export interface ICommonResponse<T = any> {
  code: EStatusCode;
  success: boolean;
  type?: Exclude<ToastT["type"], "loading" | "action" | "default" | "normal">;
  message: string;
  data?: T;
}
