import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { quizRouter } from './routes/router'
import { RouterProvider } from 'react-router'
import { QuizProvider } from './context/quiz'
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <QuizProvider>

      <RouterProvider router={quizRouter} />

    </QuizProvider>
  </StrictMode>,
)
