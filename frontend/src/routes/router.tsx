import { createBrowserRouter } from "react-router"
import Quiz from "../pages/Quiz"
import Home from "../pages/Home"
import MainLayout from "../layout/MainLayout"
import AdminLayout from "../layout/AdminLayout"
import Quizes from "../pages/Quizes"

export const quizRouter = createBrowserRouter(
  [

    {
      path: "/",

      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "quiz", element: <Quiz /> },
        { path: "quizes", element: <Quizes /> },
      ]


    },


    {
      path: "/adminDashboard",
      element: <AdminLayout />,
      children: [
      ]
    }

  ]
)



