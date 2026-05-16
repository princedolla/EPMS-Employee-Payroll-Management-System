import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Salary() {
  const [salary, setSalary] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    EmployeeNumber: "",
    GrossSalary: "",
    TotalDeduction: "",
    NetSalary: "",
    month: "",
  });

  // GET SALARY
  const getSalary = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/salaries");
      setSalary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // GET EMPLOYEES
  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSalary();
    getEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditId("");
    setFormData({
      EmployeeNumber: "",
      GrossSalary: "",
      TotalDeduction: "",
      NetSalary: "",
      month: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/salaries/${editId}`,
          formData,
        );
        setMessage("Salary updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/salaries", formData);
        setMessage("Salary added successfully");
      }

      getSalary();
      resetForm();
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editSalary = (item) => {
    setEditId(item.id);

    setFormData({
      EmployeeNumber: item.EmployeeNumber,
      GrossSalary: item.GrossSalary,
      TotalDeduction: item.TotalDeduction,
      NetSalary: item.NetSalary,
      month: item.month,
    });
  };

  const deleteSalary = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/salaries/${id}`);

      setMessage("Salary deleted successfully");
      getSalary();
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="pt-20 bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1
          className="text-4xl text-green-700 mb-6"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Salary Management
        </h1>
        {/* MESSAGE */}
        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl text-green-700 mb-6 font-semibold signature-font">
            {editId ? "Update Salary" : "Add Salary"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <select
              name="EmployeeNumber"
              className="border p-3 rounded"
              value={formData.EmployeeNumber}
              onChange={handleChange}
            >
              <option value="">Select Employee</option>
              {employees.map((item) => (
                <option key={item.employeeNumber} value={item.employeeNumber}>
                  {item.employeeNumber} - {item.FirstName} {item.LastName}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="GrossSalary"
              placeholder="Gross Salary"
              className="border p-3 rounded"
              value={formData.GrossSalary}
              onChange={handleChange}
            />

            <input
              type="number"
              name="TotalDeduction"
              placeholder="Total Deduction"
              className="border p-3 rounded"
              value={formData.TotalDeduction}
              onChange={handleChange}
            />

            <input
              type="number"
              name="NetSalary"
              placeholder="Net Salary"
              className="border p-3 rounded"
              value={formData.NetSalary}
              onChange={handleChange}
            />

            <input
              type="text"
              name="month"
              placeholder="Month"
              className="border p-3 rounded"
              value={formData.month}
              onChange={handleChange}
            />

            {/* BUTTONS */}
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                disabled={loading}
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
              >
                {loading ? "Saving..." : editId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl text-green-700 mb-6 font-semibold signature-font">Salary List</h2>

          {salary.length === 0 ? (
            <p className="text-gray-500">No salary records found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">ID</th>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Department</th>
                    <th className="p-3">Gross Salary</th>
                    <th className="p-3">Total Deduction</th>
                    <th className="p-3">Net Salary</th>
                    <th className="p-3">Month</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {salary.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{item.id}</td>
                      <td className="p-3">
                        {item.FirstName} {item.LastName}
                      </td>
                      <td className="p-3">{item.DepartmentName}</td>
                      <td className="p-3">{item.GrossSalary}</td>
                      <td className="p-3">{item.TotalDeduction}</td>
                      <td className="p-3">{item.NetSalary}</td>
                      <td className="p-3">{item.month}</td>

                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => editSalary(item)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteSalary(item.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
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

export default Salary;
