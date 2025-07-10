# Financial_Spreadsheet_Summariser AI Agent

A financial spreadsheet summariser with AI assistance. 

This AI agent will work as follows:
1. Allow users to upload CSV or Excel files
2. Parse and structure data into JSON format
3. Using OpenAI GPT to generate a professional summary in natural language.
4. Display summary in a clean manner on a React frontend UI


## Tech Stack

**Layer**       | **Technology**                | **Purpose**
---         | ---                       | ---
Frontend    | React, Taiilwind CSS      | UI for user login, registration, file upload, and summary display
Backend     | Node.js, Express.js       | REST API with user authentication, file upload, parsing, and OpenAI summarisation
Database    | MongoDB, Mongoose         | Store user credentials securely for authentication, store summaries (future implementation)
Auth and Security | bcrypt, jsonwebtoken  | Hash passwords and implement JWT-based authentication for protected routes
File upload middleware   | Multer       | Handle CSV and Excel file uploads
File parsing    | csv-parse (CSV), exceljs (Excel)  | Parse uploaded files into structured JSON for summarisation
AI integration  | OpenAI GPT API    | Generate natural language summaries based on parsed data
Environment variables   | dotenv    | Store secrets like Mongo URI, JWT secret, OpenAI key securely
Deployment  | Render, Vercel, Docker(later implementation)  | Hosting for public demo
Version control and CI/CD   | GitHub, GitHub actions
Dev Tools   | nodemon, eslint, prettier, jest, supertest    | Improve development speed, code quality, and testing capability

## Development Scripts

| **Command**      | **Description**                    |
| --- | --- |
| `npm run dev`    | Start server with nodemon          |
| `npm run lint`   | Run ESLint for code quality checks |
| `npm run format` | Run Prettier to auto-format code   |

## Environment variables
Create a .env file based on .env.sample:

```
PORT=
MONGO_URI=
JWT_SECRET=
OPENAI_API_KEY=
```

## Project Structure (Backend)

```
server/
  config/
    db.js
  routes/
  controllers/
  models/
  middleware/
  index.js
  server.js
  .env
  .env.sample
  eslint.config.js
  .prettierrc
  package.json
```
## Setup Instructions

1. Clone this repository
2. Run `npm install` inside `/server`
3. Create your `.env` based on `.env.sample`
4. Start the server with `npm run dev`

## Upcoming Features
- Full user auth flow (register/login)
  
- Excel upload support
  
- OpenAI summary route integration
  
- React frontend implementation