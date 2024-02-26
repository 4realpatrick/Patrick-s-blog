import { useSession } from "next-auth/react";

export const useConrrentUser = () => {
  const session = useSession();
  return session.data?.user;
};
