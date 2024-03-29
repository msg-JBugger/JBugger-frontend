import './style.css';
import Login from './Components/Page/Login';
import Dashboard from './Components/Page/Dashboard';
import Layout from './Components/Layout';
import BugDetails from './Components/Page/BugDetails';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import  UserManagement from './Components/Page/UserManagement';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="bug-details/:bugId" element={<ProtectedRoute><BugDetails /></ProtectedRoute>} />
            <Route path="user-management" element={<ProtectedRoute><UserManagement/></ProtectedRoute>}></Route>
            <Route index element={<Navigate to="/login" />} />
          </Route>
          <Route path="/">
            <Route index path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;