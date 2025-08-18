import { Tabs, Title } from "@/components";
import { IoArrowBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Avans, Xabarnoma, Zuvala } from "./components";
import { roles } from "@/constants";
import { useGetUSerMeQuery } from "@/integration";

export const ParkashNotification = () => {
  const { data: user_me } = useGetUSerMeQuery({});
  return (
    <>
      <div className="border-b-2 border-[#FFCC15] rounded-b-[30px] bg-[#1C2C57] p-[12px] pt-[20px] fixed top-0 left-0 w-full">
        <div className="flex justify-between items-center">
          <Link to={"/"}>
            <IoArrowBack
              size={25}
              className="bg-[#FFCC15] text-[#1C2C57] rounded-full p-1 shrink-0 cursor-pointer"
            />
          </Link>
          <Title text={"Bildirishnoma"} className="text-white mx-auto" />
        </div>
      </div>

      <div>
        {user_me?.role === roles.PARKASH ? (
          <Tabs
            contentClassName="mt-[20px]"
            tabs={[
              {
                label: "Zuvala",
                children: <Zuvala />,
              },
              {
                label: "Avans",
                children: <Avans />,
              },
              {
                label: "Xabarnoma",
                children: <Xabarnoma />,
              },
            ]}
            defaultTabIndex={0}
          />
        ) : (
          <Tabs
            contentClassName="mt-[20px]"
            tabs={[
              {
                label: "Avans",
                children: <Avans />,
              },
              {
                label: "Xabarnoma",
                children: <Xabarnoma />,
              },
            ]}
            defaultTabIndex={0}
          />
        )}
      </div>
    </>
  );
};
