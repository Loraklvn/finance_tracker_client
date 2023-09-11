# Personal Finance Tracker App (Frontend)

![React](https://img.shields.io/badge/React-v17.0.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-v4.4.4-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v2.2.15-blue)
![React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-v5.3.0-blue)
![Redux](https://img.shields.io/badge/Redux-v4.1.2-blue)

Welcome to the Personal Finance Tracker App! This frontend application complements the backend server and provides a user-friendly interface for managing your personal finances. Below, you'll find information on setting up and using the app.

## Features

- User registration and login.
- Home page displaying summary transactions grouped by categories.
- Transaction history page with the ability to create and edit transactions.
- Category management for organizing transactions.
- Basic user account page showing user information.

## Prerequisites

Before you begin, ensure you have the following requirements:

- **Node.js:** Ensure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

- **Yarn:** We recommend using Yarn as the package manager. You can install it globally by running:

  ```bash
  npm install -g yarn
  ```

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/personal-finance-tracker.git
   ```

2. Change into the project directory:

   ```bash
   cd personal-finance-tracker
   ```

3. Install project dependencies:

   ```bash
   yarn install
   ```

4. Create an `.env` file in the project root directory and add the following environment variable:

   ```dotenv
   VITE_API_URL=http://localhost:4000
   ```

   Make sure to replace `http://localhost:4000` with the actual URL of your backend server.

## Usage

To run the frontend application, you have several scripts available in the `package.json`:

- **Start the development server:**

  ```bash
  yarn dev
  ```

- **Build the production-ready project:**

  ```bash
  yarn build
  ```

- **Lint the TypeScript code:**

  ```bash
  yarn lint
  ```

- **Preview the production build:**

  ```bash
  yarn preview
  ```

Make sure to use the appropriate script according to your needs.

## Pages and Navigation

The app consists of several pages and components:

- **/register**: User registration page.
- **/login**: User login page.
- **/**: Home page displaying summary transactions by categories.
- **/transactions**: Transaction history page with the ability to create and edit transactions.
- **/account**: User account page displaying basic user information.

## Note

  This project currently lacks unit testing due to time constraints. While I would have preferred to include comprehensive unit tests, the project had to be submitted without them.
  
  Additionally, there are several areas where improvements could be made if more time were available.
  
  I appreciate your understanding.
  

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
