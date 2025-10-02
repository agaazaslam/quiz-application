import React from "react"

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {

  return (

    <div className="min-h-screen flex flex-col ">
      <nav className="p-3 bg-blue-400"> Navbar </nav>

      <div className="flex grow-1 justify-center items-center">

        {children}

      </div>

      <footer className="bg-blue-900  p-5 "> Footer </footer>

    </div>
  )
}

export default AdminLayout

