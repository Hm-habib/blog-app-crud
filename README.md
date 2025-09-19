
# Blog Web App

A simple CRUD blog website built with Node.js, Express, MongoDB, and EJS.

## Features

- User authentication (signup, login, logout)
- Guest access with limited permissions
- Create, read, update, and delete blogs
- Admin users can delete any blog
- Responsive UI with Bootstrap

## Project Structure

```
.
├── controller/         # Route controllers
├── dbConnection/       # MongoDB connection logic
├── middleware/         # Authentication middleware
├── model/              # Mongoose models
├── public/             # Static assets (CSS, images)
├── routes/             # Express route definitions
├── utilities/          # Utility functions (e.g., password encryption)
├── views/              # EJS templates
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
├── server.js           # Main server entry point
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd Blog\ web
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add:
   ```
   CONNECTION_STRING=<your-mongodb-connection-string>
   SESSION_STRING=<your-session-secret>
   ```

4. Start the server:
   ```sh
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Sign up for a new account or log in.
- Create, edit, or delete your own blogs.
- Admin users can delete any blog.
- Guests can view blogs but cannot create or edit them.

## License

[ISC](LICENSE)
