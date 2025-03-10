export class EmployeesService {
  static validateEmployeeData(employee) {
    if (!employee) {
      throw new Error("Employee data is required");
    }

    if (
      !employee.shoeSize ||
      !employee.name ||
      !employee.email ||
      !employee.cpf ||
      !employee.shirtSize
    ) {
      throw new Error(
        "Shoe size, shirt size, name, email and CPF are required"
      );
    }

    if (employee.shoeSize < 28 || employee.shoeSize > 52) {
      throw new Error("Shoe size must be between 28 and 52");
    }

    if (employee.name.length < 3 || employee.name.length > 100) {
      throw new Error("Name must be between 3 and 100 characters");
    }

    if (employee.email.length < 3 || employee.email.length > 100) {
      throw new Error("Email must be between 3 and 100 characters");
    }

    if (!employee.email.includes("@") || !employee.email.includes(".")) {
      throw new Error("Email must be valid");
    }

    if (employee.cpf.length !== 14) {
      throw new Error("CPF must have 14 characters");
    }
  }
}
