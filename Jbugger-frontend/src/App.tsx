import './style.css'
import Login from './Components/Page/Login'
import Dashboard from './Components/Page/Dashboard'
import Layout from './Components/Layout'
import BugDetails from './Components/Page/BugDetails'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* Add the new route for bug details */}
            <Route path="bug-details/:bugId" element={<ProtectedRoute><BugDetails /></ProtectedRoute>} />
          </Route>
          <Route path="/">
            <Route index path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
