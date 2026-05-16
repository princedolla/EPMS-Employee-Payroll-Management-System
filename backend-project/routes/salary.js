const express = require("express");
const router = express.Router();

const db = require("../db");

// ADD SALARY
router.post("/", (req, res) => {
  const { EmployeeNumber, GrossSalary, TotalDeduction, NetSalary, month } =
    req.body;

  const sql = `
    INSERT INTO Salary
    (
      EmployeeNumber,
      GrossSalary,
      TotalDeduction,
      NetSalary,
      month
    )
    VALUES (?,?,?,?,?)
  `;

  db.query(
    sql,
    [EmployeeNumber, GrossSalary, TotalDeduction, NetSalary, month],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Salary Added");
    },
  );
});

// GET SALARY
router.get("/", (req, res) => {
  const sql = `
    SELECT
    Salary.*,
    Employee.FirstName,
    Employee.LastName,
    Employee.Position,
    Department.DepartmentName
    FROM Salary
    LEFT JOIN Employee
    ON Salary.EmployeeNumber = Employee.employeeNumber
    LEFT JOIN Department
    ON Employee.DepartmentCode = Department.DepartmentCode
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json(result);
  });
});

// UPDATE SALARY
router.put("/:id", (req, res) => {
  const sql = `
    UPDATE Salary
    SET
    EmployeeNumber=?,
    GrossSalary=?,
    TotalDeduction=?,
    NetSalary=?,
    month=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      req.body.EmployeeNumber,
      req.body.GrossSalary,
      req.body.TotalDeduction,
      req.body.NetSalary,
      req.body.month,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Salary Updated");
    },
  );
});

// DELETE SALARY
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Salary WHERE id=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json("Salary Deleted");
  });
});

module.exports = router;
