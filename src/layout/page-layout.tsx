import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./top-bar";
import { Menu } from "./menu";
import { useGetUSerMeQuery } from "@/integration";
import { useStorage } from "@/utils";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { roles } from "@/constants";
import { useEffect } from "react";

export const PageLayout = () => {
  const location = useLocation();
  const { data: user } = useGetUSerMeQuery({});
  const token = useStorage.getTokens().accessToken;

  useEffect(() => {
    if (user?._id) {
      const { _id } = user;
      localStorage.setItem("userId", _id);
    }
  }, [token, user]);

  console.log(user);

  if (user && token && "message" in user && user.role === roles.PARKASH) {
    toast(user.message!);
    return (
      <div>
        <Toaster />

        <div className="mt-28 px-2 flex flex-col items-center">
          <h2 className="text-white text-[18px] text-center">
            {user.message ? user.message : "Nomalum xatolik"}{" "}
            <p>bir ozdan song sahifani yangilang</p>
          </h2>

          <Button
            variant={"yellow"}
            className="mt-5"
            onClick={() => (window.location.href = "/")}
          >
            yangilash
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {location.pathname === "/p" && <TopBar />}
      <div className="py-[80px] px-[20px]">
        <Outlet />
      </div>
      {location.pathname === "/" && <Menu />}
    </div>
  );
};
