import { Router } from "express";
import { EmployeesController } from "./controllers/EmployeesController.js";

const apiRouter = Router();
const employeesController = new EmployeesController();

apiRouter.get("/employees", employeesController.getEmployees);
apiRouter.post("/employees", employeesController.createEmployee);
apiRouter.put("/employees/:id", employeesController.updateEmployee);
apiRouter.delete("/employees/:id", employeesController.deleteEmployee);

export default apiRouter;
