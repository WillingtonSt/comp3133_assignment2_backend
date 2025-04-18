const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true, min: 1000 },
    date_of_joining: { type: Date, required: true },
    department: { type: String, required: true },
    employee_photo: { type: String }, 
},
{ timestamps: true} )


const Employee = mongoose.model("Employee", employeeSchema)

module.exports = Employee