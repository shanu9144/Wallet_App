# Wallet Application

This is a full-stack wallet application that allows users to register, login, manage their wallet balance, and view transaction history. The backend is built with Node.js and Express, while the frontend is built with React.

## Features

- User registration and login
- JWT-based authentication
- Wallet balance management (deposit and withdraw)
- Transaction history
- Responsive UI

## Technologies Used

### Backend

- Node.js
- Express
- Sequelize (ORM)
- MySQL (Clever Cloud platform)
- JWT for authentication

### Frontend

- React
- Tailwind CSS
- Axios for API requests

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- MySQL database (Clever Cloud platform)

### Backend Setup

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd Wallet-application/backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```properties
    DB_HOST=bmappuwa4ptnqqsuk3cu-mysql.services.clever-cloud.com
    DB_USER=uj5j44tth60ewyp7
    DB_PASSWORD=wDdLdC5pPdvmjztaFIhZ
    DB_NAME=bmappuwa4ptnqqsuk3cu
    JWT_SECRET=my_jwt_secret_key
    PORT=5000
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ../wallet-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend development server:
    ```bash
    npm start
    ```

### Running the Application

- The backend server will run on `http://localhost:5000`.
- The frontend development server will run on `http://localhost:5173`.

## Database

The MySQL database is hosted on the Clever Cloud platform. Ensure that the database credentials in the `.env` file match those provided by Clever Cloud.

## License

This project is licensed under the MIT License.
