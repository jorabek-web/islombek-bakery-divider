export const NotFound = () => {
  return (
    <div className="flex flex-col gap-2 mt-52 items-center">
      <h1 className="text-white text-[100px] font-bold">404</h1>
      <p className="text-white text-lg">Sahifa muvjud emas</p>
      <button
        onClick={() => (location.href = "/")}
        className="text-[#1C2C57] bg-[#FFCC15] p-2 px-4 rounded-lg text-[18px] font-[600]"
      >
        yangilash
      </button>
    </div>
  );
};
