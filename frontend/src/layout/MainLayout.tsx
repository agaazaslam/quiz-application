import React from "react"
import { Outlet } from "react-router"

const MainLayout: React.FC = () => {

  return (

    <div className="min-h-screen flex flex-col ">
      <nav className="p-3 bg-blue-400"> Navbar </nav>

      <div className="flex grow-1">

        <Outlet />

      </div>

      <footer className="bg-blue-900  p-5 "> Footer </footer>

    </div>
  )
}

export default MainLayout

