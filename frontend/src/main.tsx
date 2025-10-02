import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { quizRouter } from './routes/router'
import { RouterProvider } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <RouterProvider router={quizRouter} />
  </StrictMode>,
)
