import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">
        {/* BRAND */}
        <div className="text-2xl signature-font text-blue-700 font-semibold">
          EPMS
        </div>

        {/* NAV LINKS */}
        <div className="ml-10 flex gap-2">
          <Link
            to="/employee"
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive("/employee")
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Employee
          </Link>

          <Link
            to="/department"
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive("/department")
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Department
          </Link>

          <Link
            to="/salary"
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive("/salary")
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Salary
          </Link>

          <Link
            to="/reports"
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isActive("/reports")
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Reports
          </Link>
        </div>

        {/* LOGOUT */}
        <div className="ml-auto">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
