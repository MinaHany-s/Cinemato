import { Outlet } from "react-router-dom";
import Nabvar from "./Nabvar";

export default function Layout() {
  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-[#1e1e1e] bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-size-[14px_24px]"></div>
      <Nabvar />
      <div className="pt-9"></div>

      <Outlet />
    </>
  );
}
