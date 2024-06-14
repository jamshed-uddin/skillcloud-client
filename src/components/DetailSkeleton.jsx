const DetailSkeleton = () => {
  return (
    <div className="h-screen flex lg:flex-row flex-col gap-5 space-y-8 lg:space-y-0 mt-4">
      <div className="lg:w-[60%] shrink-0  order-last lg:order-first">
        <div className="w-full skeleton bg-gray-200 h-10 rounded-2xl mb-4"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
        <div className="w-full skeleton bg-gray-200 h-6 rounded-2xl mb-3"></div>
      </div>
      <div className="skeleton h-[40%]  lg:w-[40%] shrink-0 bg-gray-200"></div>
    </div>
  );
};

export default DetailSkeleton;
