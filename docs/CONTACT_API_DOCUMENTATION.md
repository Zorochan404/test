# Contact Us API Documentation

## Overview

The Contact Us API provides comprehensive CRUD operations for managing contact form submissions with features for status tracking and message management.

## Base URL: `/api/v1/contact`

## Database Schema

### Contact Model (`models/contact.js`)

```javascript
{
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validated: true (email format)
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 2000
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'resolved'],
    default: 'new'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  timestamps: true (createdAt, updatedAt)
}
```

## API Endpoints

### 1. Create Contact
- **POST** `/addcontact`
- **Description**: Creates a new contact form submission
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "message": "I am interested in learning more about your programs."
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "contact_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "message": "I am interested in learning more about your programs.",
    "status": "new",
    "isRead": false,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 2. Get All Contacts
- **GET** `/getcontacts`
- **Description**: Retrieves all contact submissions (sorted by creation date, newest first)
- **Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "contact_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "message": "I am interested in learning more about your programs.",
      "status": "new",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### 3. Get Contact by ID
- **GET** `/getcontactbyid/:id`
- **Description**: Retrieves detailed information for a specific contact
- **Response**: Same as create contact response

### 4. Get Contacts by Status
- **GET** `/getcontactsbystatus/:status`
- **Description**: Retrieves all contacts with a specific status
- **Parameters**: status (new, read, replied, resolved)
- **Example**: `/getcontactsbystatus/new`

### 5. Get Unread Contacts
- **GET** `/getunreadcontacts`
- **Description**: Retrieves all unread contact submissions
- **Use Case**: For admin dashboard notifications

### 6. Update Contact
- **PUT** `/updatecontact/:id`
- **Description**: Updates contact information
- **Request Body**: Any fields to update
```json
{
  "status": "read",
  "isRead": true
}
```

### 7. Mark Contact as Read
- **PUT** `/markcontactasread/:id`
- **Description**: Marks a contact as read (sets isRead to true)
- **Response**:
```json
{
  "success": true,
  "data": {
    "_id": "contact_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "message": "...",
    "status": "new",
    "isRead": true,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### 8. Update Contact Status
- **PUT** `/updatecontactstatus/:id`
- **Description**: Updates contact status and marks as read
- **Request Body**:
```json
{
  "status": "replied"
}
```

### 9. Delete Contact
- **DELETE** `/deletecontact/:id`
- **Description**: Removes a contact record
- **Response**:
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

## Status Management

### Status Values:
- **new**: Newly submitted contact form (default)
- **read**: Contact has been viewed by admin
- **replied**: Admin has responded to the contact
- **resolved**: Issue/inquiry has been resolved

### Read Status:
- **isRead**: Boolean flag for quick filtering of unread messages
- Automatically set to `true` when status is updated

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
- **404 Not Found**: Contact not found
- **500 Internal Server Error**: Server error

## Usage Examples

### Frontend Contact Form
```javascript
// Submit contact form
const submitContactForm = async (formData) => {
  const response = await fetch('/api/v1/contact/addcontact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      message: formData.message
    })
  });
  
  const result = await response.json();
  
  if (result.success) {
    alert('Thank you for your message! We will get back to you soon.');
  } else {
    alert('Error submitting form. Please try again.');
  }
};
```

### Admin Dashboard
```javascript
// Get all contacts for admin list view
const getContacts = async () => {
  const response = await fetch('/api/v1/contact/getcontacts');
  const data = await response.json();
  
  if (data.success) {
    // Display contacts with firstName, lastName, email
    data.data.forEach(contact => {
      console.log(`${contact.firstName} ${contact.lastName} - ${contact.email}`);
    });
  }
};

// Get contact details when clicked
const getContactDetails = async (contactId) => {
  const response = await fetch(`/api/v1/contact/getcontactbyid/${contactId}`);
  const data = await response.json();
  
  if (data.success) {
    const contact = data.data;
    // Display full contact details including message
    console.log(`
      Name: ${contact.firstName} ${contact.lastName}
      Email: ${contact.email}
      Message: ${contact.message}
      Status: ${contact.status}
      Date: ${new Date(contact.createdAt).toLocaleString()}
    `);
  }
};

// Get unread count for notifications
const getUnreadCount = async () => {
  const response = await fetch('/api/v1/contact/getunreadcontacts');
  const data = await response.json();
  
  if (data.success) {
    const unreadCount = data.data.length;
    // Update notification badge
    document.getElementById('notification-badge').textContent = unreadCount;
  }
};
```

### Using curl

```bash
# Submit contact form
curl -X POST http://localhost:5500/api/v1/contact/addcontact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "message": "I am interested in your programs."
  }'

# Get all contacts
curl http://localhost:5500/api/v1/contact/getcontacts

# Get unread contacts
curl http://localhost:5500/api/v1/contact/getunreadcontacts

# Mark contact as read
curl -X PUT http://localhost:5500/api/v1/contact/markcontactasread/CONTACT_ID

# Update contact status
curl -X PUT http://localhost:5500/api/v1/contact/updatecontactstatus/CONTACT_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "replied"}'
```

## Setup and Testing

### 1. Start Server
```bash
npm run dev
```

### 2. Seed Sample Data
```bash
node scripts/seedContactData.js
```

### 3. Test Endpoints
Use the curl examples above or tools like Postman to test the API endpoints.

## File Structure

```
models/
└── contact.js              # Contact schema definition

controllers/
└── contactController.js    # Contact CRUD operations

routes/
└── contact.routes.js       # Contact API routes

scripts/
└── seedContactData.js      # Sample data generator

docs/
└── CONTACT_API_DOCUMENTATION.md  # This documentation
```

## Validation Rules

- **First Name**: 2-50 characters, required
- **Last Name**: 2-50 characters, required
- **Email**: Valid email format, required, converted to lowercase
- **Message**: 10-2000 characters, required
- **Status**: Must be one of: new, read, replied, resolved

All string fields are automatically trimmed of whitespace.

## UI Integration

The API supports the standard list view → details view pattern:

1. **Contact List Page**: Use `/getcontacts` to display contacts with names and email
2. **Contact Details Page**: Use `/getcontactbyid/:id` to show full message when clicked
3. **Admin Features**: Use status and read management endpoints for workflow
4. **Notifications**: Use `/getunreadcontacts` for real-time notification counts
