import './App.css'
import Home from './components/Home.jsx'
import NavBar from './components/NavBar.jsx'
import Pastes from './components/Paste.jsx'
import ViewPaste from './components/ViewPaste.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <NavBar />
        <Home />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div>
        <NavBar />
        <Pastes />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div>
        <NavBar />
        <ViewPaste />
      </div>
    ),
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
