# Role-Based Access Control (RBAC) System Documentation

## Overview

The RBAC system provides a comprehensive role-based access control mechanism for the Inframe School API. It allows fine-grained permission management through roles, permissions, and users.

## System Architecture

### Core Components

1. **Users** (`RoleUser`) - System users with assigned roles and permissions
2. **Roles** (`Role`) - Collections of permissions with hierarchical levels
3. **Permissions** (`Permission`) - Granular access controls for resources
4. **Sessions** (`UserSession`) - User session management

### Permission Hierarchy

```
Level 1: Super Admin (Full access)
Level 2: Admin (Most permissions)
Level 3: Manager (Department-specific permissions)
Level 4: Viewer (Read-only access)
```

## API Endpoints

### User Management (`/api/v1/role-users`)

#### Get All Users
```http
GET /api/v1/role-users
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "user_id",
      "username": "admin",
      "email": "admin@inframe.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": {
        "_id": "role_id",
        "name": "Admin",
        "level": 2
      },
      "permissions": [],
      "isActive": true,
      "lastLogin": "2024-01-01T00:00:00.000Z",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create User
```http
POST /api/v1/role-users
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "newuser",
  "email": "newuser@inframe.com",
  "password": "password123",
  "firstName": "New",
  "lastName": "User",
  "role": "role_id",
  "permissions": ["permission_id1", "permission_id2"]
}
```

#### Update User
```http
PUT /api/v1/role-users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Updated",
  "lastName": "Name",
  "role": "new_role_id"
}
```

#### Delete User
```http
DELETE /api/v1/role-users/:id
Authorization: Bearer <token>
```

### Role Management (`/api/v1/roles`)

#### Get All Roles
```http
GET /api/v1/roles
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "role_id",
      "name": "Admin",
      "description": "Administrative access",
      "level": 2,
      "permissions": [
        {
          "_id": "permission_id",
          "name": "users-read",
          "resource": "users",
          "action": "read"
        }
      ],
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Create Role
```http
POST /api/v1/roles
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Content Manager",
  "description": "Manage content and courses",
  "level": 3,
  "permissions": ["permission_id1", "permission_id2"]
}
```

#### Update Role
```http
PUT /api/v1/roles/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Updated description",
  "permissions": ["new_permission_id"]
}
```

#### Delete Role
```http
DELETE /api/v1/roles/:id
Authorization: Bearer <token>
```

### Permission Management (`/api/v1/permissions`)

#### Get All Permissions
```http
GET /api/v1/permissions
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "permission_id",
      "name": "users-read",
      "description": "Read user information",
      "resource": "users",
      "action": "read",
      "section": "user-management",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Permissions by Section
```http
GET /api/v1/permissions/section/:section
Authorization: Bearer <token>
```

#### Get Permissions by Resource
```http
GET /api/v1/permissions/resource/:resource
Authorization: Bearer <token>
```

#### Create Permission
```http
POST /api/v1/permissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "custom-permission",
  "description": "Custom permission description",
  "resource": "custom-resource",
  "action": "write",
  "section": "custom-section"
}
```

#### Update Permission
```http
PUT /api/v1/permissions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "description": "Updated description"
}
```

#### Delete Permission
```http
DELETE /api/v1/permissions/:id
Authorization: Bearer <token>
```

#### Get All Sections
```http
GET /api/v1/permissions/sections/all
Authorization: Bearer <token>
```

#### Get All Resources
```http
GET /api/v1/permissions/resources/all
Authorization: Bearer <token>
```

## Data Models

### User Schema
```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: ObjectId, ref: 'Role', required: true },
  permissions: [{ type: ObjectId, ref: 'Permission' }],
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Role Schema
```javascript
{
  name: { type: String, required: true, unique: true },
  description: { type: String },
  level: { type: Number, required: true }, // 1-4 hierarchy
  permissions: [{ type: ObjectId, ref: 'Permission' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### Permission Schema
```javascript
{
  name: { type: String, required: true, unique: true },
  description: { type: String },
  resource: { type: String, required: true }, // e.g., 'users', 'courses'
  action: { type: String, required: true }, // 'read', 'write', 'delete'
  section: { type: String, required: true }, // e.g., 'user-management'
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}
```

## Authentication & Authorization

### JWT Authentication
The system uses JWT tokens for authentication. Include the token in the Authorization header:
```http
Authorization: Bearer <jwt_token>
```

### Permission Checking
The middleware checks permissions in this order:
1. **Super Admin (Level 1)**: Bypasses all permission checks
2. **Direct User Permissions**: Checks user's individual permissions
3. **Role Permissions**: Checks permissions assigned to user's role

### Permission Format
Permissions follow the pattern: `<resource>-<action>`
- `users-read`: Read user data
- `courses-write`: Create/update courses
- `blogs-delete`: Delete blog posts

## Default Roles & Permissions

### Super Admin (Level 1)
- **Access**: Full system access
- **Permissions**: All permissions automatically granted

### Admin (Level 2)
- **Access**: Most administrative functions
- **Permissions**: User, role, permission, content, admission, course, and blog management

### Content Manager (Level 3)
- **Access**: Content and course management
- **Permissions**: Content, course, and blog management

### Admission Officer (Level 3)
- **Access**: Admission and student data management
- **Permissions**: Admission management + read-only user access

### Viewer (Level 4)
- **Access**: Read-only access to most content
- **Permissions**: Read permissions only

## Security Features

### Password Security
- BCrypt hashing with 12 salt rounds
- Secure password comparison
- Password change tracking

### Session Management
- JWT-based authentication
- Token expiration handling
- Session validation middleware

### Data Protection
- Input validation and sanitization
- Unique constraints enforcement
- Soft delete functionality
- Account status management

## Usage Examples

### Protecting Routes
```javascript
import authenticateToken from '../middleware/auth.js';
import checkPermission from '../middleware/permission.js';

// Route with authentication and permission check
router.get('/users', 
  authenticateToken, 
  checkPermission('users', 'read'), 
  async (req, res) => {
    // Route handler
  }
);
```

### Creating a New Role
```javascript
const newRole = {
  name: 'Course Instructor',
  description: 'Manage assigned courses',
  level: 3,
  permissions: ['courses-read', 'courses-write']
};
```

### Assigning Permissions to Users
```javascript
const userUpdate = {
  role: 'role_id',
  permissions: ['custom-permission-1', 'custom-permission-2']
};
```

## Error Handling

### HTTP Status Codes
- **200**: Success
- **201**: Created
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (invalid/missing token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not Found
- **500**: Internal Server Error

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

## Testing

### Run Tests
```bash
node scripts/testRoleSystem.js
```

### Seed Data
```bash
node scripts/seedRoleData.js
```

### Default Credentials
After seeding, you can use these default accounts:
- **Super Admin**: superadmin@inframe.com / SuperAdmin123!
- **Admin**: admin@inframe.com / Admin123!
- **Content Manager**: content@inframe.com / Content123!
- **Admission Officer**: admission@inframe.com / Admission123!

## Best Practices

### Role Design
1. **Principle of Least Privilege**: Assign minimum necessary permissions
2. **Role Hierarchy**: Use levels to establish clear authority structure
3. **Descriptive Names**: Use clear, descriptive role and permission names

### Permission Management
1. **Resource-Based**: Organize permissions by resource type
2. **Action Granularity**: Use specific actions (read, write, delete)
3. **Section Organization**: Group related permissions by section

### Security Considerations
1. **Regular Audits**: Review and update permissions regularly
2. **Token Management**: Implement proper token expiration and refresh
3. **Input Validation**: Validate all user inputs
4. **Logging**: Log authentication and authorization events

## Integration with Existing APIs

The RBAC system can be integrated with existing APIs by adding the authentication and permission middleware:

```javascript
// Example: Protecting the news API
router.get('/news', 
  authenticateToken, 
  checkPermission('content', 'read'), 
  getNews
);

router.post('/news', 
  authenticateToken, 
  checkPermission('content', 'write'), 
  createNews
);
```

This ensures that only users with appropriate permissions can access different parts of the system. 