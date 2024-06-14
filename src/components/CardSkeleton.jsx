const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((item, index) => (
        <div
          className="rounded-xl skeleton shadow-md h-64 lg:h-80 w-full bg-gray-200"
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default CardSkeleton;
