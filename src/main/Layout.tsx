import BackgroundVideo from "@/components/custom/BackgroundVideo";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {

  return (
    <>

      <div>
      
        <Header />

        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    </>
  )
}