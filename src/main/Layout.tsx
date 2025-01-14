import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

const Layout: React.FC = () => {

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

export default Layout;