# Authentication Backend with Prisma and Express.js

This is a simple authentication backend project built with Prisma and Express.js. It allows users to register and log in. User data is stored in a database, and passwords are securely hashed.

## Getting Started

These instructions will help you set up and run the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following software installed:

- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installing Dependencies

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-auth-backend.git
   cd your-auth-backend

2. Install project dependencies:

   ```bash
   npm install
   # OR
   yarn

3. Setting up Environment Variables:

   ```bash
   DATABASE_URL="mysql://root:randompassword@localhost:8000/expressAuthentication"
   JWT_KEY="key_to_generate_jwt"

4. Running the server:

   ```bash
   npm start
   # OR
   yarn start

5. API Endpoints: 

   GET /authenticate
   POST /login
   POST /signup
   POST /logout

6. Database Setup:

   ```bash
   npx prisma generate


