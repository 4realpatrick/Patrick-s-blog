const Loading = () => {
  return (
    <div className="flex items-center justify-center size-full">
      <section className="w-[200px] h-16 relative z-[1]">
        <div className="size-[20px] absolute rounded-[50%] bg-primary left-[15%] origin-[50%] animate-loader-circle"></div>
        <div className="size-[20px] absolute rounded-[50%] bg-primary origin-[50%] left-[45%] delay-200 animate-loader-circle"></div>
        <div className="size-[20px] absolute rounded-[50%] bg-primary origin-[50%] left-auto right-[15%] delay-300 animate-loader-circle"></div>
        <div className=" w-5 h-[4px] rounded-[50%] bg-[rgba(0,0,0,0.9)] absolute top-[62px] origin-[50%] z-[-1] left-[15%] blur-[1px]"></div>
        <div className="w-5 h-[4px] rounded-[50%] bg-[rgba(0,0,0,0.9)] absolute top-[62px] origin-[50%] z-[-1] blur-[1px] left-[45%] delay-200"></div>
        <div className="w-5 h-[4px] rounded-[50%] bg-[rgba(0,0,0,0.9)] absolute top-[62px] origin-[50%] z-[-1] blur-[1px] left-auto right-[15%] delay-300"></div>
      </section>
    </div>
  );
};

export default Loading;
