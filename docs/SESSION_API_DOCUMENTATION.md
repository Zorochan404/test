# Session Login Details API Documentation

## Overview

The Session Login Details API provides endpoints to manage user session information with the following schema:
- Name
- Phone Number
- Email
- City
- Course

## Database Schema

### Session Model (`models/session.js`)

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 15
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validated: true (email format)
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  course: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  loginTime: {
    type: Date,
    default: Date.now
  },
  ipAddress: String,
  device: String,
  isActive: {
    type: Boolean,
    default: true
  },
  timestamps: true (createdAt, updatedAt)
}
```

## API Endpoints

### Base URL: `/api/v1/session`

### 1. Create Session
- **POST** `/addsession`
- **Description**: Creates a new session login record
- **Request Body**:
```json
{
  "name": "John Doe",
  "phoneNumber": "+1234567890",
  "email": "john.doe@example.com",
  "city": "New York",
  "course": "Web Development"
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "session_id",
    "name": "John Doe",
    "phoneNumber": "+1234567890",
    "email": "john.doe@example.com",
    "city": "New York",
    "course": "Web Development",
    "loginTime": "2024-01-15T10:30:00.000Z",
    "isActive": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Sessions
- **GET** `/getsessions`
- **Description**: Retrieves all session records (sorted by login time, newest first)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "session_id",
      "name": "John Doe",
      "phoneNumber": "+1234567890",
      "email": "john.doe@example.com",
      "city": "New York",
      "course": "Web Development",
      "loginTime": "2024-01-15T10:30:00.000Z",
      "isActive": true
    }
  ]
}
```

### 3. Get Session by ID
- **GET** `/getsessionbyid/:id`
- **Description**: Retrieves detailed information for a specific session
- **Response**: Same as create session response

### 4. Get Sessions by City
- **GET** `/getsessionsbycity/:city`
- **Description**: Retrieves all sessions from a specific city
- **Example**: `/getsessionsbycity/New York`

### 5. Get Sessions by Course
- **GET** `/getsessionsbycourse/:course`
- **Description**: Retrieves all sessions for a specific course
- **Example**: `/getsessionsbycourse/Web Development`

### 6. Get Active Sessions
- **GET** `/getactivesessions`
- **Description**: Retrieves all currently active sessions

### 7. Update Session
- **PUT** `/updatesession/:id`
- **Description**: Updates session information
- **Request Body**: Any fields to update
```json
{
  "isActive": false,
  "city": "Los Angeles"
}
```

### 8. Delete Session
- **DELETE** `/deletesession/:id`
- **Description**: Removes a session record
- **Response**:
```json
{
  "success": true,
  "message": "Session deleted successfully"
}
```

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common error scenarios:
- **400 Bad Request**: Invalid data (validation errors)
- **404 Not Found**: Session not found
- **500 Internal Server Error**: Server error

## Usage Examples

### Frontend Integration

#### 1. Session List Page
Display users with name and phone number:

```javascript
// Fetch all sessions
const response = await fetch('/api/v1/session/getsessions');
const data = await response.json();

if (data.success) {
  data.data.forEach(session => {
    console.log(`${session.name} - ${session.phoneNumber}`);
  });
}
```

#### 2. Session Details Page
Show detailed information when a session is clicked:

```javascript
// Fetch session details
const sessionId = 'session_id_here';
const response = await fetch(`/api/v1/session/getsessionbyid/${sessionId}`);
const data = await response.json();

if (data.success) {
  const session = data.data;
  console.log(`
    Name: ${session.name}
    Phone: ${session.phoneNumber}
    Email: ${session.email}
    City: ${session.city}
    Course: ${session.course}
    Login Time: ${new Date(session.loginTime).toLocaleString()}
  `);
}
```

## Setup and Testing

### 1. Start the Server
```bash
npm run dev
```

### 2. Seed Sample Data
```bash
node scripts/seedSessionData.js
```

### 3. Test Endpoints

Using curl:
```bash
# Get all sessions
curl http://localhost:3000/api/v1/session/getsessions

# Get session by ID
curl http://localhost:3000/api/v1/session/getsessionbyid/SESSION_ID

# Create new session
curl -X POST http://localhost:3000/api/v1/session/addsession \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phoneNumber": "+1234567890",
    "email": "test@example.com",
    "city": "Test City",
    "course": "Test Course"
  }'
```

## File Structure

```
models/
└── session.js              # Session schema definition

controllers/
└── sessionController.js    # Session CRUD operations

routes/
└── session.routes.js       # Session API routes

scripts/
└── seedSessionData.js      # Sample data generator

docs/
└── SESSION_API_DOCUMENTATION.md  # This documentation
```

## Validation Rules

- **Name**: 2-100 characters, required
- **Phone Number**: 10-15 characters, required
- **Email**: Valid email format, required, converted to lowercase
- **City**: 2-50 characters, required
- **Course**: 2-100 characters, required

All string fields are automatically trimmed of whitespace.
