import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Department() {
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    DepartmentCode: "",
    DepartmentName: "",
    GrossSalary: "",
    TotalDeduction: "",
  });

  const getDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setEditId("");
    setFormData({
      DepartmentCode: "",
      DepartmentName: "",
      GrossSalary: "",
      TotalDeduction: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/departments/${editId}`,
          formData,
        );
        setMessage("Department updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/departments", formData);
        setMessage("Department created successfully");
      }

      getDepartments();
      resetForm();
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editDepartment = (item) => {
    setEditId(item.DepartmentCode);

    setFormData({
      DepartmentCode: item.DepartmentCode,
      DepartmentName: item.DepartmentName,
      GrossSalary: item.GrossSalary,
      TotalDeduction: item.TotalDeduction,
    });
  };

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`);

      setMessage("Department deleted");
      getDepartments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="pt-20 bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1
          className="text-4xl text-green-700 mb-6 signature-font" >
          Department Management
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
            {editId ? "Update Department" : "Add Department"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              name="DepartmentCode"
              placeholder="Department Code"
              className="border p-3 rounded"
              value={formData.DepartmentCode}
              onChange={handleChange}
              readOnly={editId !== ""}
            />

            <input
              type="text"
              name="DepartmentName"
              placeholder="Department Name"
              className="border p-3 rounded"
              value={formData.DepartmentName}
              onChange={handleChange}
            />

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
          <h2 className="text-2xl text-green-700 mb-6 font-semibold signature-font">Department List</h2>

          {departments.length === 0 ? (
            <p className="text-gray-500">No departments found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">Department Code</th>
                    <th className="p-3">Department Name</th>
                    <th className="p-3">Gross Salary</th>
                    <th className="p-3">Total Deduction</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {departments.map((item) => (
                    <tr
                      key={item.DepartmentCode}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">{item.DepartmentCode}</td>
                      <td className="p-3">{item.DepartmentName}</td>
                      <td className="p-3">{item.GrossSalary}</td>
                      <td className="p-3">{item.TotalDeduction}</td>

                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => editDepartment(item)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteDepartment(item.DepartmentCode)}
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

export default Department;
