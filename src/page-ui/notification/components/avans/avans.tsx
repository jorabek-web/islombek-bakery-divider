import { FaRegClock } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

export const Avans = () => {
  return (
    <div className="space-y-5">
      <div className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px] text-white">
        <p className="text-[20px] font-[600]">Shuhrat Azizov</p>
        <div className="flex items-center justify-between gap-2 py-[10px]">
          <div className="flex items-center gap-x-2">
            <LuCalendarDays size={20} />
            <p className="text-[10px] font-[400]">
              {new Date("2025-08-18T13:57:51.270Z").toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaRegClock size={20} />
            <p className="text-[10px] font-[400]">
              {new Date("2025-08-18T13:57:51.270Z").toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-x-2 w-1/3">
            <p className="text-[16px] font-[400]">400 000</p>
          </div>
        </div>

        <div className="w-full p-2 flex items-center justify-between gap-5">
          <button
            onClick={() => console.log("Bekor qilish")}
            className="bg-[#C71A1A] p-1 px-3 rounded-[3px] text-white"
          >
            Bekor qilish
          </button>
          <button
            onClick={() => console.log("Tasdiqlash")}
            className="bg-[#099431] p-1 px-3 rounded-[3px] text-white"
          >
            Tasdiqlash
          </button>
        </div>
      </div>

      <div className="rounded-[12px] border-[2px] border-[#FFCC15] p-[10px] text-white">
        <p className="text-[20px] font-[600]">Shuhrat Azizov</p>
        <div className="flex items-center justify-between gap-2 py-[10px]">
          <div className="flex items-center gap-x-2">
            <LuCalendarDays size={20} />
            <p className="text-[10px] font-[400]">
              {new Date("2025-08-18T13:57:51.270Z").toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center gap-x-2">
            <FaRegClock size={20} />
            <p className="text-[10px] font-[400]">
              {new Date("2025-08-18T13:57:51.270Z").toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-x-2 w-1/3">
            <p className="text-[16px] font-[400]">300 000</p>
          </div>
        </div>
      </div>
    </div>
  );
};
