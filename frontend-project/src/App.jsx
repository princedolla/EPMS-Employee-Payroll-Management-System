import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Employee from "./pages/Employee";
import Department from "./pages/Department";
import Salary from "./pages/Salary";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./components/Logout";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/employee" /> : <Login />}
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employee />
            </ProtectedRoute>
          }
        />

        <Route
          path="/department"
          element={
            <ProtectedRoute>
              <Department />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary"
          element={
            <ProtectedRoute>
              <Salary />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/employee" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
