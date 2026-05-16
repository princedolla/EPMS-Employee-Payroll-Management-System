import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    employeeNumber: "",
    FirstName: "",
    LastName: "",
    Position: "",
    Address: "",
    Telephone: "",
    Gender: "",
    hiredDate: "",
    DepartmentCode: "",
  });

  const getEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDepartments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/departments");
      setDepartments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmployees();
    getDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setEditId("");
    setFormData({
      employeeNumber: "",
      FirstName: "",
      LastName: "",
      Position: "",
      Address: "",
      Telephone: "",
      Gender: "",
      hiredDate: "",
      DepartmentCode: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/api/employees/${editId}`,
          formData,
        );
        setMessage("Employee updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/employees", formData);
        setMessage("Employee added successfully");
      }

      getEmployees();
      clearForm();
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const editEmployee = (item) => {
    setEditId(item.employeeNumber);

    setFormData({
      employeeNumber: item.employeeNumber,
      FirstName: item.FirstName,
      LastName: item.LastName,
      Position: item.Position,
      Address: item.Address,
      Telephone: item.Telephone,
      Gender: item.Gender,
      hiredDate: item.hiredDate ? item.hiredDate.split("T")[0] : "",
      DepartmentCode: item.DepartmentCode,
    });
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      setMessage("Employee deleted");
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
     <div className="pt-20 bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1
          className="text-4xl text-blue-700 mb-6"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Employee Management
        </h1>

        {/* MESSAGE */}
        {message && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded">
            {message}
          </div>
        )}

        {/* FORM CARD */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 signature-font">
            {editId ? "Update Employee" : "Add Employee"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <select
              name="employeeNumber"
              className="border p-3 rounded"
              value={formData.employeeNumber}
              onChange={handleChange}
              disabled={editId !== ""}
            >
              <option value="">Select Employee Number</option>
              {["EMP001", "EMP002", "EMP003", "EMP004", "EMP005"].map((emp) => (
                <option key={emp} value={emp}>
                  {emp}
                </option>
              ))}
            </select>

            <input
              name="FirstName"
              placeholder="First Name"
              className="border p-3 rounded"
              value={formData.FirstName}
              onChange={handleChange}
            />

            <input
              name="LastName"
              placeholder="Last Name"
              className="border p-3 rounded"
              value={formData.LastName}
              onChange={handleChange}
            />

            <input
              name="Position"
              placeholder="Position"
              className="border p-3 rounded"
              value={formData.Position}
              onChange={handleChange}
            />

            <input
              name="Telephone"
              placeholder="Telephone"
              className="border p-3 rounded"
              value={formData.Telephone}
              onChange={handleChange}
            />

            <select
              name="Gender"
              className="border p-3 rounded"
              value={formData.Gender}
              onChange={handleChange}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              type="date"
              name="hiredDate"
              className="border p-3 rounded"
              value={formData.hiredDate}
              onChange={handleChange}
            />

            <select
              name="DepartmentCode"
              className="border p-3 rounded"
              value={formData.DepartmentCode}
              onChange={handleChange}
            >
              <option value="">Department</option>
              {departments.map((d) => (
                <option key={d.DepartmentCode} value={d.DepartmentCode}>
                  {d.DepartmentName}
                </option>
              ))}
            </select>

            {/* BUTTONS */}
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                disabled={loading}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                {loading ? "Saving..." : editId ? "Update" : "Save"}
              </button>

              <button
                type="button"
                onClick={clearForm}
                className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4 signature-font">Employee List</h2>

          {employees.length === 0 ? (
            <p className="text-gray-500">No employees found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="p-3">No</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Position</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Gender</th>
                    <th className="p-3">Department Name</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map((e, i) => (
                    <tr
                      key={e.employeeNumber}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="p-3">{e.employeeNumber}</td>
                      <td className="p-3">
                        {e.FirstName} {e.LastName}
                      </td>
                      <td className="p-3">{e.Position}</td>
                      <td className="p-3">{e.Telephone}</td>
                      <td className="p-3">{e.Gender}</td>
                      <td className="p-3">{e.DepartmentName}</td>
                      <td className="p-3 flex gap-2">
                        <button
                          onClick={() => editEmployee(e)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteEmployee(e.employeeNumber)}
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

export default Employee;
