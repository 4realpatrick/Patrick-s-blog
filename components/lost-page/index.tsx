import Image404 from "../svg-components/image-404";
import OperateBtn from "./operate-btn";
const LostPage = () => {
  return (
    <div className="flex flex-col items-center bg-background px-20 mt-8 justify-center flex-1 space-y-10">
      <Image404 className="size-[500px]" />
      <h1 className="w-[22ch] text-5xl animate-typing whitespace-nowrap overflow-hidden border-solid border-r-8 border-primary">
        你所访问的页面或资源不存在
      </h1>
      <OperateBtn />
    </div>
  );
};

export default LostPage;
