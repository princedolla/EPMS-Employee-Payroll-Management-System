import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2">
      Logout
    </button>
  );
}

export default Logout;