const CategorySkeleton = () => {
  const skeletons = Array.from({ length: 7 });

  return (
    <div className="scroll-container flex flex-row gap-4 overflow-x-auto snap-x h-48">
      {skeletons.map((_, index) => (
        <div key={index} className="single-category flex justify-center gap-1 flex-col cursor-pointer relative w-56 p-4">
          <div className="image-skeleton bg-gray-300 h-48 rounded-md animate-pulse shadow-xl"></div>
          <p className="text-skeleton bg-gray-300 h-6 w-3/4 mt-2 rounded-md animate-pulse text-grayColor">Loading</p>
          <div className="absolute inset-0 hover:bg-blackColor hover:bg-opacity-20 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
