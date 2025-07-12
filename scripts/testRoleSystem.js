import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1';

// Test data
const testRole = {
    name: 'Test Admin',
    description: 'Test administrator role',
    level: 2,
    isActive: true
};

const testPermission = {
    name: 'test-permission',
    description: 'Test permission for testing',
    resource: 'test',
    action: 'read',
    section: 'test-section',
    isActive: true
};

const testUser = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    isActive: true
};

let authToken = '';
let roleId = '';
let permissionId = '';
let userId = '';

const logResult = (testName, success, data = null, error = null) => {
    console.log(`\n${success ? '✅' : '❌'} ${testName}`);
    if (data) {
        console.log('Response:', JSON.stringify(data, null, 2));
    }
    if (error) {
        console.log('Error:', error.response?.data || error.message);
    }
};

// Test 1: Create a permission
const testCreatePermission = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/permissions`, testPermission);
        logResult('Create Permission', true, response.data);
        permissionId = response.data.data._id;
        return response.data.data;
    } catch (error) {
        logResult('Create Permission', false, null, error);
        return null;
    }
};

// Test 2: Create a role
const testCreateRole = async () => {
    try {
        const roleData = { ...testRole, permissions: [permissionId] };
        const response = await axios.post(`${BASE_URL}/roles`, roleData);
        logResult('Create Role', true, response.data);
        roleId = response.data.data._id;
        return response.data.data;
    } catch (error) {
        logResult('Create Role', false, null, error);
        return null;
    }
};

// Test 3: Create a user
const testCreateUser = async () => {
    try {
        const userData = { ...testUser, role: roleId };
        const response = await axios.post(`${BASE_URL}/role-users`, userData);
        logResult('Create User', true, response.data);
        userId = response.data.data._id;
        return response.data.data;
    } catch (error) {
        logResult('Create User', false, null, error);
        return null;
    }
};

// Test 4: Get all permissions
const testGetAllPermissions = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/permissions`);
        logResult('Get All Permissions', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get All Permissions', false, null, error);
        return [];
    }
};

// Test 5: Get permissions by section
const testGetPermissionsBySection = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/permissions/section/${testPermission.section}`);
        logResult('Get Permissions by Section', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get Permissions by Section', false, null, error);
        return [];
    }
};

// Test 6: Get permissions by resource
const testGetPermissionsByResource = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/permissions/resource/${testPermission.resource}`);
        logResult('Get Permissions by Resource', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get Permissions by Resource', false, null, error);
        return [];
    }
};

// Test 7: Get all roles
const testGetAllRoles = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/roles`);
        logResult('Get All Roles', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get All Roles', false, null, error);
        return [];
    }
};

// Test 8: Get all users
const testGetAllUsers = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/role-users`);
        logResult('Get All Users', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get All Users', false, null, error);
        return [];
    }
};

// Test 9: Update permission
const testUpdatePermission = async () => {
    try {
        const updateData = { description: 'Updated test permission description' };
        const response = await axios.put(`${BASE_URL}/permissions/${permissionId}`, updateData);
        logResult('Update Permission', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update Permission', false, null, error);
        return null;
    }
};

// Test 10: Update role
const testUpdateRole = async () => {
    try {
        const updateData = { description: 'Updated test role description' };
        const response = await axios.put(`${BASE_URL}/roles/${roleId}`, updateData);
        logResult('Update Role', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update Role', false, null, error);
        return null;
    }
};

// Test 11: Update user
const testUpdateUser = async () => {
    try {
        const updateData = { firstName: 'Updated' };
        const response = await axios.put(`${BASE_URL}/role-users/${userId}`, updateData);
        logResult('Update User', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Update User', false, null, error);
        return null;
    }
};

// Test 12: Get all sections
const testGetAllSections = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/permissions/sections/all`);
        logResult('Get All Sections', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get All Sections', false, null, error);
        return [];
    }
};

// Test 13: Get all resources
const testGetAllResources = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/permissions/resources/all`);
        logResult('Get All Resources', true, response.data);
        return response.data.data;
    } catch (error) {
        logResult('Get All Resources', false, null, error);
        return [];
    }
};

// Test 14: Delete user (soft delete)
const testDeleteUser = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/role-users/${userId}`);
        logResult('Delete User', true, response.data);
        return response.data;
    } catch (error) {
        logResult('Delete User', false, null, error);
        return null;
    }
};

// Test 15: Delete role (soft delete)
const testDeleteRole = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/roles/${roleId}`);
        logResult('Delete Role', true, response.data);
        return response.data;
    } catch (error) {
        logResult('Delete Role', false, null, error);
        return null;
    }
};

// Test 16: Delete permission (soft delete)
const testDeletePermission = async () => {
    try {
        const response = await axios.delete(`${BASE_URL}/permissions/${permissionId}`);
        logResult('Delete Permission', true, response.data);
        return response.data;
    } catch (error) {
        logResult('Delete Permission', false, null, error);
        return null;
    }
};

// Main test runner
const runAllTests = async () => {
    console.log('🚀 Starting Role-Based Access Control System Tests\n');
    
    // Create operations
    await testCreatePermission();
    await testCreateRole();
    await testCreateUser();
    
    // Read operations
    await testGetAllPermissions();
    await testGetPermissionsBySection();
    await testGetPermissionsByResource();
    await testGetAllRoles();
    await testGetAllUsers();
    await testGetAllSections();
    await testGetAllResources();
    
    // Update operations
    await testUpdatePermission();
    await testUpdateRole();
    await testUpdateUser();
    
    // Delete operations
    await testDeleteUser();
    await testDeleteRole();
    await testDeletePermission();
    
    console.log('\n🎉 All tests completed!');
};

// Run tests
runAllTests().catch(console.error); 