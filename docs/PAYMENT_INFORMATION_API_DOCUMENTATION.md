# Payment Information API Documentation

## Overview

The Payment Information API provides comprehensive functionality for managing student payments, EMI plans, payment transactions, and fee calculations. This system integrates with the User and Course models to provide a complete payment management solution.

## Base URL

```
http://localhost:5000/api/v1/payment-information
```

## Authentication

Most endpoints require authentication. Include the session token in the request headers:

```
Authorization: Bearer <session_token>
```

## API Endpoints

### 1. Create Payment Information

**POST** `/api/v1/payment-information`

Creates a new payment information record for a user and course program.

#### Request Body

```json
{
  "userId": "507f1f77bcf86cd799439011",
  "courseId": "507f1f77bcf86cd799439012",
  "programId": "program_123",
  "totalFee": 50000,
  "registrationFee": 5000,
  "processingFee": 500,
  "emiPlan": {
    "totalEmis": 12,
    "emiAmount": 3750,
    "emiFrequency": "monthly",
    "startDate": "2024-01-15T00:00:00.000Z"
  }
}
```

#### Response

```json
{
  "success": true,
  "message": "Payment information created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "courseId": "507f1f77bcf86cd799439012",
    "programId": "program_123",
    "totalFee": 50000,
    "registrationFee": 5000,
    "processingFee": 500,
    "totalAmountPaid": 0,
    "totalAmountDue": 50000,
    "paymentStatus": "pending",
    "emiPlan": {
      "totalEmis": 12,
      "emiAmount": 3750,
      "emiFrequency": "monthly",
      "emiPayments": [
        {
          "emiNumber": 1,
          "dueDate": "2024-02-15T00:00:00.000Z",
          "amount": 3750,
          "status": "pending"
        }
        // ... more EMI payments
      ],
      "emisPaid": 0,
      "emisRemaining": 12
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get Payment Information by ID

**GET** `/api/v1/payment-information/:id`

Retrieves payment information by its ID with populated user and course details.

#### Response

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "applicationId": "APP2024001"
    },
    "courseId": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Web Development Course",
      "description": "Complete web development program"
    },
    "totalFee": 50000,
    "totalAmountPaid": 15000,
    "totalAmountDue": 35000,
    "paymentStatus": "partial"
  }
}
```

### 3. Get Payment Information by User

**GET** `/api/v1/payment-information/user/:userId`

Retrieves all payment information records for a specific user.

#### Response

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "courseId": {
        "title": "Web Development Course",
        "description": "Complete web development program"
      },
      "totalFee": 50000,
      "paymentStatus": "partial"
    },
    {
      "_id": "507f1f77bcf86cd799439014",
      "courseId": {
        "title": "Data Science Course",
        "description": "Advanced data science program"
      },
      "totalFee": 75000,
      "paymentStatus": "completed"
    }
  ]
}
```

### 4. Record Payment Transaction

**POST** `/api/v1/payment-information/:id/payment`

Records a new payment transaction and updates EMI payments accordingly.

#### Request Body

```json
{
  "amount": 3750,
  "paymentMethod": "online",
  "transactionId": "TXN_123456789",
  "description": "EMI payment for January 2024",
  "gatewayTransactionId": "GATEWAY_TXN_987654321",
  "paymentGateway": "razorpay"
}
```

#### Response

```json
{
  "success": true,
  "message": "Payment recorded successfully",
  "data": {
    "paymentInfo": {
      "totalAmountPaid": 18750,
      "totalAmountDue": 31250,
      "emiPlan": {
        "emisPaid": 5,
        "emisRemaining": 7
      }
    },
    "transaction": {
      "transactionId": "TXN_123456789",
      "amount": 3750,
      "paymentMethod": "online",
      "status": "success",
      "description": "EMI payment for January 2024"
    }
  }
}
```

### 5. Apply Coupon

**POST** `/api/v1/payment-information/:id/coupon`

Applies a discount coupon to the payment.

#### Request Body

```json
{
  "couponCode": "WELCOME20",
  "discountAmount": 10000,
  "discountType": "fixed",
  "originalValue": 50000
}
```

#### Response

```json
{
  "success": true,
  "message": "Coupon applied successfully",
  "data": {
    "paymentInfo": {
      "totalDiscount": 10000,
      "totalAmountDue": 40000,
      "appliedCoupons": [
        {
          "couponCode": "WELCOME20",
          "discountAmount": 10000,
          "discountType": "fixed",
          "appliedAt": "2024-01-15T10:30:00.000Z"
        }
      ]
    },
    "couponUsage": {
      "couponCode": "WELCOME20",
      "discountAmount": 10000,
      "discountType": "fixed"
    }
  }
}
```

### 6. Get EMI Schedule

**GET** `/api/v1/payment-information/:id/emi-schedule`

Retrieves the complete EMI schedule for a payment.

#### Response

```json
{
  "success": true,
  "data": {
    "emiPlan": {
      "totalEmis": 12,
      "emiAmount": 3750,
      "emiFrequency": "monthly",
      "emiPayments": [
        {
          "emiNumber": 1,
          "dueDate": "2024-02-15T00:00:00.000Z",
          "amount": 3750,
          "paidAmount": 3750,
          "status": "paid",
          "paidDate": "2024-02-10T00:00:00.000Z"
        },
        {
          "emiNumber": 2,
          "dueDate": "2024-03-15T00:00:00.000Z",
          "amount": 3750,
          "status": "pending"
        }
      ],
      "emisPaid": 1,
      "emisRemaining": 11
    },
    "totalEmis": 12,
    "emisPaid": 1,
    "emisRemaining": 11,
    "nextPaymentDate": "2024-03-15T00:00:00.000Z"
  }
}
```

### 7. Get Payment Transactions

**GET** `/api/v1/payment-information/:id/transactions?page=1&limit=10&status=success`

Retrieves payment transactions with pagination and filtering.

#### Query Parameters

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by transaction status

#### Response

```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "transactionId": "TXN_123456789",
        "amount": 3750,
        "paymentMethod": "online",
        "paymentGateway": "razorpay",
        "status": "success",
        "description": "EMI payment for January 2024",
        "createdAt": "2024-02-10T00:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 1,
      "totalTransactions": 1,
      "hasNextPage": false,
      "hasPrevPage": false
    }
  }
}
```

### 8. Calculate Late Fees

**POST** `/api/v1/payment-information/:id/calculate-late-fees`

Calculates and applies late fees for overdue EMI payments.

#### Response

```json
{
  "success": true,
  "data": {
    "totalLateFees": 187.5,
    "lateFees": {
      "totalLateFees": 187.5,
      "lateFeeRate": 2,
      "gracePeriod": 5
    },
    "updatedPaymentInfo": {
      "totalAmountDue": 31387.5,
      "emiPlan": {
        "emiPayments": [
          {
            "emiNumber": 2,
            "dueDate": "2024-03-15T00:00:00.000Z",
            "amount": 3750,
            "lateFee": 187.5,
            "status": "overdue"
          }
        ]
      }
    }
  }
}
```

### 9. Update Payment Settings

**PUT** `/api/v1/payment-information/:id/settings`

Updates payment settings like auto-debit and reminders.

#### Request Body

```json
{
  "autoDebit": {
    "enabled": true,
    "bankAccount": {
      "accountNumber": "1234567890",
      "ifscCode": "SBIN0001234",
      "accountHolderName": "John Doe"
    }
  },
  "paymentReminders": {
    "enabled": true
  },
  "lateFees": {
    "lateFeeRate": 2.5,
    "gracePeriod": 7
  }
}
```

#### Response

```json
{
  "success": true,
  "message": "Payment settings updated successfully",
  "data": {
    "autoDebit": {
      "enabled": true,
      "bankAccount": {
        "accountNumber": "1234567890",
        "ifscCode": "SBIN0001234",
        "accountHolderName": "John Doe"
      }
    },
    "paymentReminders": {
      "enabled": true
    },
    "lateFees": {
      "lateFeeRate": 2.5,
      "gracePeriod": 7
    }
  }
}
```

### 10. Get Payment Summary

**GET** `/api/v1/payment-information/user/:userId/summary`

Retrieves a comprehensive payment summary for a user.

#### Response

```json
{
  "success": true,
  "data": {
    "totalPayments": 2,
    "totalAmountDue": 45000,
    "totalAmountPaid": 80000,
    "overduePayments": 1,
    "completedPayments": 1,
    "upcomingPayments": 0,
    "paymentBreakdown": {
      "pending": 0,
      "partial": 1,
      "completed": 1,
      "overdue": 0
    }
  }
}
```

### 11. Get Overdue Payments (Admin)

**GET** `/api/v1/payment-information/overdue/all`

Retrieves all overdue payments across all users (admin endpoint).

#### Response

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890"
      },
      "courseId": {
        "title": "Web Development Course"
      },
      "totalAmountDue": 3750,
      "nextPaymentDate": "2024-03-15T00:00:00.000Z"
    }
  ]
}
```

### 12. Delete Payment Information

**DELETE** `/api/v1/payment-information/:id`

Soft deletes a payment information record.

#### Response

```json
{
  "success": true,
  "message": "Payment information deleted successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "success": false,
  "message": "Missing required fields: userId, courseId, programId, totalFee"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Payment information not found"
}
```

### 409 Conflict

```json
{
  "success": false,
  "message": "Payment information already exists for this user and course program"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

## Data Models

### Payment Information Schema

```javascript
{
  userId: ObjectId (ref: 'User'),
  courseId: ObjectId (ref: 'Course'),
  programId: String,
  totalFee: Number,
  registrationFee: Number,
  processingFee: Number,
  totalAmountPaid: Number,
  totalAmountDue: Number,
  paymentStatus: String (enum: ['pending', 'partial', 'completed', 'overdue', 'defaulted']),
  emiPlan: {
    totalEmis: Number,
    emiAmount: Number,
    emiFrequency: String (enum: ['monthly', 'quarterly', 'yearly']),
    emiPayments: [EMIPaymentSchema],
    emisPaid: Number,
    emisRemaining: Number
  },
  paymentTransactions: [PaymentTransactionSchema],
  appliedCoupons: [CouponUsageSchema],
  totalDiscount: Number,
  lateFees: {
    totalLateFees: Number,
    lateFeeRate: Number,
    gracePeriod: Number
  },
  autoDebit: {
    enabled: Boolean,
    bankAccount: {
      accountNumber: String,
      ifscCode: String,
      accountHolderName: String
    }
  },
  isActive: Boolean
}
```

### EMI Payment Schema

```javascript
{
  emiNumber: Number,
  dueDate: Date,
  amount: Number,
  paidAmount: Number,
  paidDate: Date,
  status: String (enum: ['pending', 'paid', 'overdue', 'partial']),
  lateFee: Number,
  paymentMethod: String,
  transactionId: String
}
```

### Payment Transaction Schema

```javascript
{
  transactionId: String,
  amount: Number,
  paymentMethod: String,
  paymentGateway: String,
  gatewayTransactionId: String,
  status: String (enum: ['pending', 'success', 'failed', 'refunded', 'cancelled']),
  description: String,
  receiptUrl: String
}
```

## Integration with User Model

The User model includes a reference to payment information:

```javascript
{
  // ... other user fields
  paymentInformation: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentInformation'
  }]
}
```

To populate payment information when fetching user data:

```javascript
const user = await User.findById(userId)
  .populate('paymentInformation')
  .exec();
```

## Best Practices

1. **Validation**: Always validate ObjectIds before database queries
2. **Error Handling**: Implement proper error handling for all payment operations
3. **Transaction Logging**: Log all payment transactions for audit purposes
4. **Late Fee Calculation**: Calculate late fees before processing payments
5. **EMI Management**: Update EMI status automatically when payments are recorded
6. **Security**: Implement proper authentication and authorization for payment operations
7. **Data Consistency**: Use database transactions for critical payment operations

## Rate Limiting

Consider implementing rate limiting for payment endpoints to prevent abuse:

- Payment recording: 10 requests per minute per user
- Coupon application: 5 requests per minute per user
- Payment information retrieval: 30 requests per minute per user

## Monitoring

Monitor the following metrics:

- Payment success/failure rates
- EMI default rates
- Late fee collection
- Payment processing times
- API response times
- Error rates by endpoint 