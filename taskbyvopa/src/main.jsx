import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Homepage/>} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
