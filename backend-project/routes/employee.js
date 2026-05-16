const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const db = require("../db");

// ADD EMPLOYEE
router.post("/", (req, res) => {
  const {
    employeeNumber,
    FirstName,
    LastName,
    Position,
    Address,
    Telephone,
    Gender,
    hiredDate,
    DepartmentCode,
  } = req.body;

  const sql = `
    INSERT INTO Employee
    (
      employeeNumber,
      FirstName,
      LastName,
      Position,
      Address,
      Telephone,
      Gender,
      hiredDate,
      DepartmentCode
    )
    VALUES (?,?,?,?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      employeeNumber,
      FirstName,
      LastName,
      Position,
      Address,
      Telephone,
      Gender,
      hiredDate,
      DepartmentCode,
    ],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Employee Added");
    },
  );
});

// GET EMPLOYEES
router.get("/", (req, res) => {
  const sql = `
    SELECT
    Employee.*,
    Department.DepartmentName
    FROM Employee
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

// UPDATE EMPLOYEE
router.put("/:id", (req, res) => {
  const sql = `
    UPDATE Employee
    SET
    FirstName=?,
    LastName=?,
    Position=?,
    Address=?,
    Telephone=?,
    Gender=?,
    hiredDate=?,
    DepartmentCode=?
    WHERE employeeNumber=?
  `;

  db.query(
    sql,
    [
      req.body.FirstName,
      req.body.LastName,
      req.body.Position,
      req.body.Address,
      req.body.Telephone,
      req.body.Gender,
      req.body.hiredDate,
      req.body.DepartmentCode,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Employee Updated");
    },
  );
});

// DELETE EMPLOYEE
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Employee WHERE employeeNumber=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json("Employee Deleted");
  });
});

module.exports = router;
