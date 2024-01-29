import LoginBackground from "@/components/svg-components/login-background";
const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full bg-background">
      <div className="flex flex-col-reverse justify-around mt-[100px] mx-8 sm:flex-row ">
        <div className="flex-1 max-w-[800px]">{children}</div>
        <div className="relative ml-10 grow max-w-[1200px]">
          <LoginBackground />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
