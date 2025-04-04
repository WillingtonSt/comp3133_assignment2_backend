# GraphQL API for User and Employee Management

This project is a GraphQL API designed to manage users and employees. The API allows users to sign up, log in, and access employee data. Additionally, employees can be added, updated, and deleted through the GraphQL mutations.

## Features

- **User Management**: Allows user signup, login, and JWT authentication.
- **Employee Management**: Allows CRUD operations on employee data (Add, Update, Delete, Fetch).
- **Authentication**: User authentication with JWT and password hashing using bcrypt.
- **Error Handling**: Includes robust error handling for invalid inputs, non-existent resources, and authorization issues.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **GraphQL**: Query language for APIs to handle requests.
- **MongoDB**: NoSQL database for storing user and employee data.
- **Mongoose**: MongoDB ODM for managing schema and interacting with MongoDB.
- **bcryptjs**: Library for hashing passwords securely.
- **jsonwebtoken**: Library for creating and verifying JWT tokens.
- **Apollo Server**: For integrating GraphQL with the Node.js server.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (either locally or a cloud provider like MongoDB Atlas)
- A `.env` file for environment variables (for example, `JWT_SECRET`)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/graphql-api.git
   cd graphql-api
