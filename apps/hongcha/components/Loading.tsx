const Loading = () => {
  return (
    <div className="grid grid-cols-4 gap-4 bg-black">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="animate-pulse w-[200px]">
          <div className="h-40 bg-gray-200" />
        </div>
      ))}
    </div>
  );
};
export default Loading;
