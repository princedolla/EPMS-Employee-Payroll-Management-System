const express = require("express");
const router = express.Router();

const db = require("../db");

// ADD DEPARTMENT
router.post("/", (req, res) => {
  const { DepartmentCode, DepartmentName, GrossSalary, TotalDeduction } =
    req.body;

  const sql = `
    INSERT INTO Department
    (
      DepartmentCode,
      DepartmentName,
      GrossSalary,
      TotalDeduction
    )
    VALUES (?,?,?,?)
  `;

  db.query(
    sql,
    [DepartmentCode, DepartmentName, GrossSalary, TotalDeduction],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Department Added");
    },
  );
});

// GET DEPARTMENTS
router.get("/", (req, res) => {
  db.query("SELECT * FROM Department", (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json(result);
  });
});

// UPDATE DEPARTMENT
router.put("/:id", (req, res) => {
  const sql = `
    UPDATE Department
    SET
    DepartmentName=?,
    GrossSalary=?,
    TotalDeduction=?
    WHERE DepartmentCode=?
  `;

  db.query(
    sql,
    [
      req.body.DepartmentName,
      req.body.GrossSalary,
      req.body.TotalDeduction,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        return res.json(err);
      }

      res.json("Department Updated");
    },
  );
});

// DELETE DEPARTMENT
router.delete("/:id", (req, res) => {
  const sql = "DELETE FROM Department WHERE DepartmentCode=?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      return res.json(err);
    }

    res.json("Department Deleted");
  });
});

module.exports = router;
