# Project Management API

A backend REST API built with Node.js, Express, and SQLite for managing projects and user authentication.

## Features

- User authentication (signup/login) with JWT
- Project management (create, list, view)
- Contact form submission
- API documentation with Swagger
- Request logging with Morgan

## Setup

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create .env file with:
```
JWT_SECRET=your_jwt_secret_key
PORT=3000
```
4. Start the server:
```bash
npm start
```

## API Documentation

### Authentication Endpoints

#### Sign Up
```
POST /api/auth/signup
```
Request:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
Response (201):
```json
{
  "message": "User created successfully"
}
```

#### Login
```
POST /api/auth/login
```
Request:
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```
Response (200):
```json
{
  "token": "jwt_token_here"
}
```

### Project Endpoints

#### Create Project
```
POST /api/projects
Authorization: Bearer {token}
```
Request:
```json
{
  "title": "New Project",
  "description": "Project description",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31"
}
```
Response (201):
```json
{
  "id": 1
}
```

#### Get All Projects
```
GET /api/projects
Authorization: Bearer {token}
```
Query Parameters:
- start_date (optional): Filter by start date
- end_date (optional): Filter by end date

Response (200):
```json
[
  {
    "id": 1,
    "title": "New Project",
    "description": "Project description",
    "start_date": "2024-01-01",
    "end_date": "2024-12-31"
  }
]
```

#### Get Project by ID
```
GET /api/projects/{id}
Authorization: Bearer {token}
```
Response (200):
```json
{
  "id": 1,
  "title": "New Project",
  "description": "Project description",
  "start_date": "2024-01-01",
  "end_date": "2024-12-31"
}
```

### Contact Form Endpoint

#### Submit Contact Form
```
POST /api/contact
```
Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I have a question..."
}
```
Response (201):
```json
{
  "id": 1
}
```

## Error Responses

All endpoints may return the following error responses:

400 Bad Request:
```json
{
  "error": "Error message here"
}
```

401 Unauthorized:
```json
{
  "error": "Access denied"
}
```

404 Not Found:
```json
{
  "error": "Resource not found"
}
```

500 Server Error:
```json
{
  "error": "Something went wrong!"
}
```

## Logging

API requests are logged in:
- Console (development environment)
- `logs/access.log` file

## Technologies Used

- Node.js & Express
- SQLite3 for database
- JWT for authentication
- Swagger for API documentation
- Morgan for request logging

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

Access Swagger documentation at: `http://localhost:3000/api-docs`