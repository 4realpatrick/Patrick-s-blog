import LoginBackground from "@/components/svg-components/login-background";
import Accessbility from "./_components/accessbility";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] w-screen bg-background flex justify-center items-center px-10 flex-col-reverse lg:flex-row space-x-0 lg:space-x-20 pt-20 lg:pt-0">
      <div className="pt-8 md:flex-1 space-y-8 pb-8 lg:pb-0 lg:pl-20">
        <Accessbility />
        {children}
      </div>
      <div className="lg:flex-1 w-2/3 lg:w-full flex justify-center lg:block">
        <LoginBackground />
      </div>
    </div>
  );
};

export default AuthLayout;
