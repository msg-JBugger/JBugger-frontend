import './style.css'
import Login from './Components/Account/Login'
import Dashboard from './Components/Dashboard'
import Layout from './Components/Layout'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  return (
    <>
      <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute> } />
                </Route>
                <Route path="/">
                    <Route index path="login" element={<Login />} />
                </Route>
                <Route path="*" element={<Navigate to="/login"/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
