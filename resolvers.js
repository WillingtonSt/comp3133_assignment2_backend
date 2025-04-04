const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Employee = require("./models/Employee");
require("dotenv").config();

const resolvers = {
  Query: {
    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { token, user };
    },

    async getAllEmployees() {
      return await Employee.find();
    },

    async getEmployeeById(_, { id }) {
    try {
        const employee = await Employee.findById(id);
        return employee;
    } catch {
        throw new Error("Employee not found");
    }
     
    },

    async searchEmployees(_, { designation, department }) {
      const filter = {};
      if (designation) filter.designation = designation;
      if (department) filter.department = department;

      return await Employee.find(filter);
    },
  },

  Mutation: {
    async signup(_, { username, email, password }) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      }

     
      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

      return { token, user: newUser };
    },

    async addEmployee(_, args) {
      const newEmployee = new Employee(args);
      await newEmployee.save();
      return newEmployee;
    },

    async updateEmployee(_, { id, ...updateData }) {
      try {
        const filteredData = Object.fromEntries(
          Object.entries(updateData).filter(([_, value]) => value !== undefined && value !== null)
        );

        console.log("Update called for ID:", id);
        console.log("Fields to update:", filteredData); 
    
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { $set: filteredData },
          { new: true }
        );
    
        if (!updatedEmployee) {
          throw new Error("Employee not found");
        }
    
        return updatedEmployee;
      } catch (err) {
        throw new Error("Failed to update employee: " + err.message);
      }
    },

    async deleteEmployee(_, { id }) {
    try{
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      return "Employee deleted successfully";
        } catch {
            throw new Error("Employee not found");
        }  
    },
  },
};

module.exports = resolvers;
