# Admission & Payment Flow API Documentation

## Overview
This document describes the API endpoints and data flow for submitting an admission form and creating linked payment information in the system. The process ensures that admission details are saved first, then payment details are created and linked to both the user and the admission.

---

## 1. Submit Admission Form

**Endpoint:**
```
POST /api/admission/submit
```

**Description:**
Submits a new admission form for a user. If course and program information are provided, payment information is also created and linked to the user and the admission.

**Request Body Example:**
```json
{
  "userId": "64f1c2e5b2a1c2d3e4f5a6b7",
  "courseId": "64f1c2e5b2a1c2d3e4f5a6b8",
  "programId": "64f1c2e5b2a1c2d3e4f5a6b9",
  "paymentType": "other", // or "full"// required if paymentType is emi
  "couponCode": "WELCOME10", // optional
  "initialPayment": 10000, // amount paid initially
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "gender": "male",
  "address": "123 Test Street",
  "city": "Test City",
  "state": "Test State",
  "pincode": "123456",
  "phone": "1234567890",
  "email": "john.doe@example.com",
  "education": "Bachelor's Degree",
  "workExperience": "2 years"
}
```

**Success Response Example:**
```json
{
  "success": true,
  "message": "Admission form submitted successfully",
  "data": {
    "admission": {
      "_id": "64f1c2e5b2a1c2d3e4f5a6c1",
      "userId": "64f1c2e5b2a1c2d3e4f5a6b7",
      "firstName": "John",
      "lastName": "Doe",
      // ...other admission fields...
      "submittedAt": "2024-06-12T12:00:00.000Z"
    },
    "paymentInformation": {
      "_id": "64f1c2e5b2a1c2d3e4f5a6c2",
      "userId": "64f1c2e5b2a1c2d3e4f5a6b7",
      "admissionId": "64f1c2e5b2a1c2d3e4f5a6c1",
      "courseId": "64f1c2e5b2a1c2d3e4f5a6b8",
      "programId": "64f1c2e5b2a1c2d3e4f5a6b9",
      "totalFee": 50000,
      "registrationFee": 5000,
      "processingFee": 1000,
      "totalAmountPaid": 10000,
      "totalAmountDue": 40000,
      "paymentStatus": "partial",
      "emiPlan": {
        "totalEmis": 6,
        "emiAmount": 6667,
        "emiFrequency": "monthly",
        "startDate": "2024-07-12T12:00:00.000Z",
        "endDate": "2024-12-12T12:00:00.000Z",
        "emiPayments": [
          { "emiNumber": 1, "dueDate": "2024-07-12T12:00:00.000Z", "amount": 6667, "status": "pending" },
          // ...
        ],
        "emisPaid": 0,
        "emisRemaining": 6
      },
      "totalDiscount": 5000,
      "nextPaymentDate": "2024-07-12T12:00:00.000Z",
      "remarks": "Payment created for admission form submission. Payment type: emi",
      "documents": {
        "feeReceipts": [],
        "emiAgreement": "Generated on admission submission",
        "paymentProofs": []
      }
    },
    "user": {
      "_id": "64f1c2e5b2a1c2d3e4f5a6b7",
      "admissionFormId": "64f1c2e5b2a1c2d3e4f5a6c1",
      "paymentInformation": ["64f1c2e5b2a1c2d3e4f5a6c2"]
    }
  }
}
```

**Error Response Example:**
```json
{
  "success": false,
  "error": {
    "code": 400,
    "type": "ADMISSION",
    "message": "Invalid user ID"
  }
}
```

---

## 2. Get Admission by User ID

**Endpoint:**
```
GET /api/admission/user/:userId
```

**Description:**
Fetches the admission form for a given user.

**Success Response Example:**
```json
{
  "success": true,
  "message": "Admission form retrieved successfully",
  "data": {
    "admission": { /* ...admission fields... */ },
    "user": { "_id": "...", "admissionFormId": "..." }
  }
}
```

---

## 3. Get User with Admission and Payment

**Endpoint:**
```
GET /api/admission/user-with-admission/:userId
```

**Description:**
Fetches the user, their admission form, and all linked payment information.

**Success Response Example:**
```json
{
  "success": true,
  "message": "User data retrieved successfully",
  "data": {
    "_id": "...",
    "admissionFormId": { /* ...admission fields... */ },
    "paymentInformation": [ /* ...payment info objects... */ ]
  }
}
```

---

## Notes on Linking Logic
- The admission is always created and saved first.
- The payment information is created after the admission, and includes an `admissionId` field referencing the saved admission.
- The user document is updated to reference both the admission and the payment information.
- If payment creation fails, the admission is still saved and linked to the user.

---

## See Also
- `controllers/admissionController.js` for implementation details
- `models/paymentInformation.js` for schema
- `scripts/testAdmissionPaymentFlow.js` for a working test example 