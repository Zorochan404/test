# Admission Authentication API Documentation

## Overview
The Admission Authentication API provides user registration, login, and application progress management for the admission system. It includes session-based authentication and comprehensive application progress tracking.

## Base URL
```
http://localhost:5500/api/v1/admission-auth
```

## Authentication
Protected endpoints require a session token in the Authorization header:
```
Authorization: Bearer <session_token>
```

---

## Endpoints

### 1. User Registration (Signup)

**POST** `/signup`

Creates a new user account and generates an application ID.

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "password": "password123",
  "confirmPassword": "password123"
}
```

#### Response (201 Created)
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "applicationId": "APP2024001"
    },
    "sessionToken": "session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0",
    "applicationProgress": {
      "currentStep": "personal-info",
      "isComplete": false,
      "submittedAt": null,
      "personalInfo": {
        "firstName": "",
        "lastName": "",
        "email": "john.doe@example.com",
        "phone": "9876543210",
        "dateOfBirth": "",
        "gender": "",
        "religion": "",
        "aadharNumber": "",
        "permanentAddress": "",
        "temporaryAddress": "",
        "city": "",
        "state": "",
        "pincode": "",
        "fathersName": "",
        "fathersPhone": "",
        "fathersOccupation": "",
        "fathersQualification": "",
        "mothersName": "",
        "mothersPhone": "",
        "mothersOccupation": "",
        "mothersQualification": "",
        "parentsAnnualIncome": "",
        "parentsAddress": "",
        "localGuardianName": "",
        "localGuardianPhone": "",
        "localGuardianOccupation": "",
        "localGuardianRelation": "",
        "localGuardianAddress": "",
        "profilePhoto": null,
        "signature": null,
        "aadharCard": null,
        "randomDocuments": []
      },
      "academicDetails": {
        "tenthBoard": "",
        "tenthInstitution": "",
        "tenthStream": "",
        "tenthPercentage": "",
        "tenthYear": "",
        "tenthMarksheet": null,
        "twelfthBoard": "",
        "twelfthInstitution": "",
        "twelfthStream": "",
        "twelfthPercentage": "",
        "twelfthYear": "",
        "twelfthMarksheet": null,
        "diplomaInstitution": "",
        "diplomaStream": "",
        "diplomaPercentage": "",
        "diplomaYear": "",
        "diplomaMarksheet": null,
        "graduationUniversity": "",
        "graduationPercentage": "",
        "graduationYear": "",
        "graduationMarksheet": null
      },
      "programSelection": {
        "programType": "",
        "programName": "",
        "programCategory": "",
        "specialization": "",
        "campus": ""
      },
      "paymentComplete": false,
      "paymentDetails": null
    }
  }
}
```

#### Error Responses

**400 Bad Request** - Validation errors
```json
{
  "success": false,
  "error": "All fields are required"
}
```

**409 Conflict** - User already exists
```json
{
  "success": false,
  "error": "User with this email or phone number already exists"
}
```

---

### 2. User Login

**POST** `/login`

Authenticates user and returns session token.

#### Request Body
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "applicationId": "APP2024001"
    },
    "sessionToken": "session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0",
    "applicationProgress": {
      // Same structure as signup response
    }
  }
}
```

#### Error Responses

**400 Bad Request** - Missing fields
```json
{
  "success": false,
  "error": "Email and password are required"
}
```

**401 Unauthorized** - Invalid credentials
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

### 3. Get User Profile

**GET** `/profile`

Returns current user's profile and application progress.

#### Headers
```
Authorization: Bearer <session_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "9876543210",
      "applicationId": "APP2024001"
    },
    "applicationProgress": {
      // Complete application progress structure
    }
  }
}
```

#### Error Responses

**401 Unauthorized** - Invalid session
```json
{
  "success": false,
  "error": "Session token required"
}
```

---

### 4. Update Application Progress

**PUT** `/application-progress`

Updates the application progress for a specific step.

#### Headers
```
Authorization: Bearer <session_token>
```

#### Request Body
```json
{
  "step": "personal-info",
  "data": {
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1995-05-15",
    "gender": "Male",
    "religion": "Hindu",
    "aadharNumber": "123456789012",
    "permanentAddress": "123 Main Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "fathersName": "Robert Doe",
    "fathersPhone": "9876543211",
    "fathersOccupation": "Engineer",
    "fathersQualification": "B.Tech",
    "mothersName": "Jane Doe",
    "mothersPhone": "9876543212",
    "mothersOccupation": "Teacher",
    "mothersQualification": "M.A",
    "parentsAnnualIncome": "800000",
    "parentsAddress": "123 Main Street, Mumbai",
    "localGuardianName": "Uncle Doe",
    "localGuardianPhone": "9876543213",
    "localGuardianOccupation": "Doctor",
    "localGuardianRelation": "Uncle",
    "localGuardianAddress": "456 Side Street, Mumbai"
  }
}
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Application progress updated successfully",
  "data": {
    "applicationProgress": {
      "currentStep": "personal-info",
      "isComplete": false,
      "submittedAt": null,
      "personalInfo": {
        // Updated personal info data
      },
      "academicDetails": {
        // Existing academic details
      },
      "programSelection": {
        // Existing program selection
      },
      "paymentComplete": false,
      "paymentDetails": null
    }
  }
}
```

#### Supported Steps

1. **personal-info** - Personal information
2. **academic-details** - Academic qualifications
3. **program-selection** - Program and campus selection
4. **payment** - Payment information

---

### 5. User Logout

**POST** `/logout`

Invalidates the current session token.

#### Headers
```
Authorization: Bearer <session_token>
```

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 6. Health Check

**GET** `/health`

Returns API health status.

#### Response (200 OK)
```json
{
  "success": true,
  "message": "Admission Auth API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## Data Models

### User Schema
```javascript
{
  // Basic Information
  name: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, hashed),
  applicationId: String (unique, auto-generated),

  // Application Progress
  applicationProgress: {
    currentStep: String (enum),
    isComplete: Boolean,
    submittedAt: Date,
    personalInfo: Object,
    academicDetails: Object,
    programSelection: Object,
    paymentComplete: Boolean,
    paymentDetails: Mixed
  },

  // Session Management
  sessionToken: String,
  sessionExpiresAt: Date,

  // Account Status
  isActive: Boolean,
  isVerified: Boolean,
  verificationToken: String,
  verificationExpiresAt: Date,

  // Timestamps
  lastLoginAt: Date,
  passwordChangedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Validation Rules

### Email Validation
- Must be a valid email format
- Must be unique in the system

### Phone Validation
- Must be exactly 10 digits
- Must be unique in the system
- Only numeric characters allowed

### Password Validation
- Minimum 6 characters
- Must match confirmPassword during signup

### Aadhar Number Validation
- Must be exactly 12 digits
- Only numeric characters allowed

### Pincode Validation
- Must be exactly 6 digits
- Only numeric characters allowed

### Percentage Validation
- Must be between 0 and 100
- Can be decimal values

### Year Validation
- Must be between 1900 and current year
- Only numeric values allowed

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation errors |
| 401 | Unauthorized - Invalid credentials or session |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## Usage Examples

### Complete Registration Flow

1. **Signup**
```bash
curl -X POST http://localhost:5500/api/v1/admission-auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

2. **Update Personal Information**
```bash
curl -X PUT http://localhost:5500/api/v1/admission-auth/application-progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0" \
  -d '{
    "step": "personal-info",
    "data": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1995-05-15",
      "gender": "Male"
    }
  }'
```

3. **Update Academic Details**
```bash
curl -X PUT http://localhost:5500/api/v1/admission-auth/application-progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0" \
  -d '{
    "step": "academic-details",
    "data": {
      "tenthBoard": "CBSE",
      "tenthInstitution": "ABC School",
      "tenthPercentage": "85.5",
      "tenthYear": "2010"
    }
  }'
```

4. **Update Program Selection**
```bash
curl -X PUT http://localhost:5500/api/v1/admission-auth/application-progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0" \
  -d '{
    "step": "program-selection",
    "data": {
      "programType": "Undergraduate",
      "programName": "B.Tech",
      "specialization": "Computer Science",
      "campus": "Mumbai"
    }
  }'
```

5. **Logout**
```bash
curl -X POST http://localhost:5500/api/v1/admission-auth/logout \
  -H "Authorization: Bearer session_1703123456789_64f8a1b2c3d4e5f6a7b8c9d0"
```

---

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 12
2. **Session Management**: Secure session tokens with expiration (7 days)
3. **Input Validation**: Comprehensive validation for all inputs
4. **Unique Constraints**: Email and phone numbers must be unique
5. **Account Status**: Support for account activation/deactivation

---

## Notes

- Session tokens expire after 7 days
- Application IDs are auto-generated in format: `APP{year}{sequence}`
- All timestamps are in ISO 8601 format
- File uploads for documents are handled separately through the upload API
- The system maintains backward compatibility with existing admission data 