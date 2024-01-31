import LoginBackground from "@/components/svg-components/login-background";
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="size-full bg-background flex justify-center items-center">
      <div className="flex flex-1 flex-col-reverse justify-around mx-8 sm:flex-row ">
        <div className="flex-1 max-w-[800px]">{children}</div>
        <div className="relative ml-10 grow max-w-[1200px]">
          <LoginBackground />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
