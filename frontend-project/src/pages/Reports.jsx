import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getReports();
  }, []);

  const getReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/salaries");
      setReports(res.data);
    } catch (error) {
      console.log(error);
      setMessage("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="pt-20 bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        {/* TITLE */}
        <h1 className="text-4xl text-indigo-700 mb-6 signature-font ">
          Payroll Reports
        </h1>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {message}
          </div>
        )}

        {/* CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl text-indigo-700 font-semibold mb-4 signature-font">Salary Summary Report</h2>

          {loading ? (
            <p className="text-gray-500">Loading reports...</p>
          ) : reports.length === 0 ? (
            <p className="text-gray-500">No payroll data available</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">First Name</th>
                    <th className="p-3">Last Name</th>
                    <th className="p-3">Position</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Net Salary</th>
                  </tr>
                </thead>

                <tbody>
                  {reports.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.FirstName}</td>
                      <td className="p-3">{item.LastName}</td>
                      <td className="p-3">{item.Position}</td>
                      <td className="p-3">{item.DepartmentName}</td>
                      <td className="p-3 font-semibold text-green-700">
                        {item.NetSalary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
