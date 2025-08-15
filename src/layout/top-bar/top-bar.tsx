import { Title } from "@/components";
import { useGetUSerMeQuery } from "@/integration";
import { FaBell } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";

export const TopBar = () => {
  const { data: userMe } = useGetUSerMeQuery({});

  return (
    <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[20px] pt-[24px] fixed top-0 w-full">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <IoArrowBack
            size={25}
            className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
          />
        </Link>
        <Title
          text={(userMe?.fullName && userMe?.fullName) || "Bildirishnoma"}
          className="text-white mx-auto"
        />
        <Link to="/notification" aria-label="Bildirishnoma">
          <FaBell size={25} className="text-[#FFCC15] cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};
