import React from "react"
import { Outlet } from "react-router"

const MainLayout: React.FC = () => {

  return (

    <div className="min-h-screen flex flex-col ">
      <nav className="p-3 bg-blue-400"> Navbar </nav>

      <div className="grow-1  container mx-auto px-4 py-12 max-w-6xl">

        <Outlet />

      </div>

      <footer className="bg-blue-900  p-5 "> Footer </footer>

    </div>
  )
}

export default MainLayout

