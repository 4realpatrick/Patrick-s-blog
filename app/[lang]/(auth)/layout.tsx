import LoginBackground from "@/components/svg-components/login-background";
import Accessbility from "./_components/accessbility";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full bg-background flex justify-center items-center px-10 h-[inherit]">
      <div className="flex flex-1 flex-col-reverse justify-around mx-8 sm:flex-row space-x-10">
        <div className="flex-1 pt-8 max-w-[1000px] space-y-8">
          <Accessbility />
          {children}
        </div>
        <div className="relative grow max-w-[1200px] flex items-center">
          <LoginBackground />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
