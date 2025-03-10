import { PrismaClient } from "@prisma/client";
import { EmployeesService } from "../services/EmployeesService.js";

const db = new PrismaClient();

export class EmployeesController {
  async getEmployees(req, res) {
    try {
      const field = req.query.field;
      const query = req.query.query;

      let where = {};
      if (field && query && ["name", "email", "cpf"].includes(field)) {
        where = {
          [field]: {
            contains: query,
            mode: "insensitive",
          },
        };
      } else if (field && query && field === "shoeSize") {
        where = {
          shoeSize: Number(query),
        };
      } else if (field && query && field === "shirtSize") {
        where = {
          shirtSize: query,
        };
      }

      const employees = await db.employees.findMany({
        where,
        orderBy: { id: "asc" },
      });

      res.send(employees);
    } catch (error) {
      res.status(500).json({
        message: `Error while getting employees: ${error.message}`,
      });
    }
  }

  async createEmployee(req, res) {
    try {
      const newEmployee = req.body;
      if (!newEmployee) {
        res.status(400).send("Employee data is required");
        return;
      }

      EmployeesService.validateEmployeeData(newEmployee);

      const employee = await db.employees.create({ data: newEmployee });

      res.json({
        message: "Employee created",
        employee: employee,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error while creating employee: ${error.message}`,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const id = req.params.id;
      const updatedEmployee = req.body;

      if (!updatedEmployee) {
        res.status(400).send("Employee data is required");
        return;
      }

      if (!id) {
        res.status(400).send("Employee ID is required");
        return;
      }

      EmployeesService.validateEmployeeData(updatedEmployee);

      updatedEmployee.id = undefined;
      const employee = await db.employees.update({
        where: { id },
        data: updatedEmployee,
      });

      res.json({
        message: "Employee updated",
        employee: employee,
      });
    } catch (error) {
      res.status(500).json({
        message: `Error while updating employee: ${error.message}`,
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        res.status(400).send("Employee ID is required");
        return;
      }

      await db.employees.delete({ where: { id } });

      res.json({
        message: "Employee deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: `Error while deleting employee: ${error.message}`,
      });
    }
  }
}
