import { Outlet, useLocation } from "react-router-dom";
import { TopBar } from "./top-bar";
import { Menu } from "./menu";

export const PageLayout = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname === "/" && <TopBar />}
      <div className="py-[80px] px-[20px]">
        <Outlet />
      </div>
      {(location.pathname === "/" || location.pathname === "/xarajatlar" || location.pathname === "/kassa-hisoboti" || location.pathname === "/zakazlar") && <Menu />}
    </div>
  );
};
