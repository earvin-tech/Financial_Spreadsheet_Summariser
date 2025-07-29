# 📊 Financial Spreadsheet Summariser AI Agent

An AI-powered Express.js backend that processes financial spreadsheets (CSV/Excel), converts them to structured data, and generates a professional summary using OpenAI. Includes full user authentication, file upload, and containerized development setup.

---

## 🧠 How It Works

1. Users upload a CSV or Excel file  
2. The file is parsed and structured into JSON format  
3. OpenAI GPT API generates a summary in professional natural language  
4. The result is displayed on a React frontend (WIP)

---

## 🧰 Tech Stack

| Layer              | Tech                                  | Purpose                                                                  |
|--------------------|----------------------------------------|--------------------------------------------------------------------------|
| Frontend           | React, Tailwind CSS                    | UI for uploading files and viewing summaries (WIP)                       |
| Backend            | Node.js, Express.js                    | REST API with auth, upload, and AI integration                           |
| Auth & Security    | bcrypt, jsonwebtoken                   | Secure user registration/login + route protection                        |
| File Upload        | Multer                                 | Handle CSV and Excel uploads                                             |
| File Parsing       | csv-parse (CSV), ExcelJS (Excel)       | Convert spreadsheet files to structured JSON                             |
| AI Integration     | OpenAI GPT API                         | Summarise financial data in natural language                             |
| Validation         | express-validator                      | Validate all incoming requests and payloads                              |
| Env Management     | dotenv                                 | Manage secrets like Mongo URI, JWT secret, OpenAI API key                |
| Linting & Formatting | ESLint, Prettier                     | Ensure code consistency and quality                                      |
| Testing            | Jest, Supertest                        | API integration and functional tests                                     |
| Containerization   | Docker, Docker Compose                 | Dev and test environment isolation                                       |
| CI/CD              | GitHub, lint-staged             | Pre-commit checks and automated workflows                                |
| Deployment         | Render (Backend), Vercel (Frontend)    | Cloud deployment (in progress)                                           |

---

## 📁 Backend Structure

```
server/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   └── uploadController.js
├── middleware/
│   ├── catchAsync.js
│   ├── errorHandler.js
│   └── validateUser.js
├── routes/
│   ├── userRoutes.js
│   └── uploadRoutes.js
├── models/
│   └── userModel.js
├── utils/
│   └── generateToken.js
├── tests/
│   ├── user.test.js
│   ├── upload.test.js
│   └── sample.test.js
├── Dockerfile
├── .dockerignore
├── .env
├── .env.test
├── .env.sample
├── server.js
└── index.js
```

---

## ⚙️ Development Scripts

| Command           | Description                              |
|-------------------|------------------------------------------|
| `npm run dev`     | Start server with nodemon (dev mode)     |
| `npm test`        | Run tests with Jest                      |
| `npm run lint`    | Run ESLint checks                        |
| `npm run format`  | Format code using Prettier               |

---

## 🐳 Docker Setup

> Run backend and MongoDB together for consistent dev/testing.

```bash
docker-compose up --build
```

Access the API at: `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env` file inside `server/` based on this template:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/financebot
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key
NODE_ENV=development
```

Also create a `.env.test` for running tests:

```env
MONGO_URI=mongodb://localhost:27017/financebot_test
JWT_SECRET=test_secret
NODE_ENV=test
```

---

## ✅ Running Tests

Ensure Docker is running and connected to MongoDB, then:

```bash
npm test
```

Covers:

- User registration & login  
- Auth-protected access  
- File upload validation

---

## 🚧 Upcoming Features

- [x] User registration and login  
- [x] File upload & validation  
- [x] Containerized dev setup  
- [x] Pre-commit hooks with Husky  
- [ ] Excel file upload support  
- [ ] OpenAI summary integration  
- [ ] React UI for uploads and summaries  
- [ ] User dashboard with file history  

---

## 👨‍💻 Author

**Earvin Tumpao**  
- [GitHub](https://github.com/earvin-tech)  
- [Dev.to](https://dev.to/earvintech)

