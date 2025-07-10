# Financial_Spreadsheet_Summariser AI Agent

A financial spreadsheet summariser with AI assistance. 

This AI agent will work as follows:
1. Allow users to upload CSV or Excel files
2. Parse and structure data into JSON format
3. Using OpenAI GPT to generate a professional summary in natural language.
4. Display summary in a clean manner on a React frontend UI


## Tech Stack

Layer       | Technology                | Purpose
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