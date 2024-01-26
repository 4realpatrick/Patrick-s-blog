import LoginNavbar from "@/components/login-navbar";
import LostPage from "@/components/lost-page";

const NotFound = () => {
  return (
    <div className="flex flex-col h-full">
      <LoginNavbar />
      <LostPage />
    </div>
  );
};

export default NotFound;
