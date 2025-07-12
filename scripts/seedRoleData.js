import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import models
import Role from '../models/role.js';
import Permission from '../models/Permission.js';
import RoleUser from '../models/roleUser.js';

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('✅ Connected to MongoDB');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

// Sample permissions data
const permissionsData = [
    // User Management
    {
        name: 'users-read',
        description: 'Read user information',
        resource: 'users',
        action: 'read',
        section: 'user-management',
        isActive: true
    },
    {
        name: 'users-write',
        description: 'Create and update users',
        resource: 'users',
        action: 'write',
        section: 'user-management',
        isActive: true
    },
    {
        name: 'users-delete',
        description: 'Delete users',
        resource: 'users',
        action: 'delete',
        section: 'user-management',
        isActive: true
    },
    
    // Role Management
    {
        name: 'roles-read',
        description: 'Read role information',
        resource: 'roles',
        action: 'read',
        section: 'role-management',
        isActive: true
    },
    {
        name: 'roles-write',
        description: 'Create and update roles',
        resource: 'roles',
        action: 'write',
        section: 'role-management',
        isActive: true
    },
    {
        name: 'roles-delete',
        description: 'Delete roles',
        resource: 'roles',
        action: 'delete',
        section: 'role-management',
        isActive: true
    },
    
    // Permission Management
    {
        name: 'permissions-read',
        description: 'Read permission information',
        resource: 'permissions',
        action: 'read',
        section: 'permission-management',
        isActive: true
    },
    {
        name: 'permissions-write',
        description: 'Create and update permissions',
        resource: 'permissions',
        action: 'write',
        section: 'permission-management',
        isActive: true
    },
    {
        name: 'permissions-delete',
        description: 'Delete permissions',
        resource: 'permissions',
        action: 'delete',
        section: 'permission-management',
        isActive: true
    },
    
    // Content Management
    {
        name: 'content-read',
        description: 'Read content',
        resource: 'content',
        action: 'read',
        section: 'content-management',
        isActive: true
    },
    {
        name: 'content-write',
        description: 'Create and update content',
        resource: 'content',
        action: 'write',
        section: 'content-management',
        isActive: true
    },
    {
        name: 'content-delete',
        description: 'Delete content',
        resource: 'content',
        action: 'delete',
        section: 'content-management',
        isActive: true
    },
    
    // Admission Management
    {
        name: 'admissions-read',
        description: 'Read admission information',
        resource: 'admissions',
        action: 'read',
        section: 'admission-management',
        isActive: true
    },
    {
        name: 'admissions-write',
        description: 'Create and update admissions',
        resource: 'admissions',
        action: 'write',
        section: 'admission-management',
        isActive: true
    },
    {
        name: 'admissions-delete',
        description: 'Delete admissions',
        resource: 'admissions',
        action: 'delete',
        section: 'admission-management',
        isActive: true
    },
    
    // Course Management
    {
        name: 'courses-read',
        description: 'Read course information',
        resource: 'courses',
        action: 'read',
        section: 'course-management',
        isActive: true
    },
    {
        name: 'courses-write',
        description: 'Create and update courses',
        resource: 'courses',
        action: 'write',
        section: 'course-management',
        isActive: true
    },
    {
        name: 'courses-delete',
        description: 'Delete courses',
        resource: 'courses',
        action: 'delete',
        section: 'course-management',
        isActive: true
    },
    
    // Blog Management
    {
        name: 'blogs-read',
        description: 'Read blog posts',
        resource: 'blogs',
        action: 'read',
        section: 'blog-management',
        isActive: true
    },
    {
        name: 'blogs-write',
        description: 'Create and update blog posts',
        resource: 'blogs',
        action: 'write',
        section: 'blog-management',
        isActive: true
    },
    {
        name: 'blogs-delete',
        description: 'Delete blog posts',
        resource: 'blogs',
        action: 'delete',
        section: 'blog-management',
        isActive: true
    }
];

// Sample roles data
const rolesData = [
    {
        name: 'Super Admin',
        description: 'Full system access with all permissions',
        level: 1,
        isActive: true
    },
    {
        name: 'Admin',
        description: 'Administrative access with most permissions',
        level: 2,
        isActive: true
    },
    {
        name: 'Content Manager',
        description: 'Manage content, courses, and blogs',
        level: 3,
        isActive: true
    },
    {
        name: 'Admission Officer',
        description: 'Manage admissions and student data',
        level: 3,
        isActive: true
    },
    {
        name: 'Viewer',
        description: 'Read-only access to most content',
        level: 4,
        isActive: true
    }
];

// Sample users data
const usersData = [
    {
        username: 'superadmin',
        email: 'superadmin@inframe.com',
        password: 'SuperAdmin123!',
        firstName: 'Super',
        lastName: 'Admin',
        isActive: true
    },
    {
        username: 'admin',
        email: 'admin@inframe.com',
        password: 'Admin123!',
        firstName: 'System',
        lastName: 'Admin',
        isActive: true
    },
    {
        username: 'contentmanager',
        email: 'content@inframe.com',
        password: 'Content123!',
        firstName: 'Content',
        lastName: 'Manager',
        isActive: true
    },
    {
        username: 'admissionofficer',
        email: 'admission@inframe.com',
        password: 'Admission123!',
        firstName: 'Admission',
        lastName: 'Officer',
        isActive: true
    }
];

// Seed permissions
const seedPermissions = async () => {
    try {
        console.log('🌱 Seeding permissions...');
        
        // Clear existing permissions
        await Permission.deleteMany({});
        
        // Create permissions
        const permissions = await Permission.insertMany(permissionsData);
        console.log(`✅ Created ${permissions.length} permissions`);
        
        return permissions;
    } catch (error) {
        console.error('❌ Error seeding permissions:', error);
        throw error;
    }
};

// Seed roles with permissions
const seedRoles = async (permissions) => {
    try {
        console.log('🌱 Seeding roles...');
        
        // Clear existing roles
        await Role.deleteMany({});
        
        // Get permission IDs by resource
        const userPermissions = permissions.filter(p => p.resource === 'users').map(p => p._id);
        const rolePermissions = permissions.filter(p => p.resource === 'roles').map(p => p._id);
        const permissionPermissions = permissions.filter(p => p.resource === 'permissions').map(p => p._id);
        const contentPermissions = permissions.filter(p => p.resource === 'content').map(p => p._id);
        const admissionPermissions = permissions.filter(p => p.resource === 'admissions').map(p => p._id);
        const coursePermissions = permissions.filter(p => p.resource === 'courses').map(p => p._id);
        const blogPermissions = permissions.filter(p => p.resource === 'blogs').map(p => p._id);
        
        // Assign permissions to roles
        const rolesWithPermissions = [
            {
                ...rolesData[0], // Super Admin
                permissions: permissions.map(p => p._id) // All permissions
            },
            {
                ...rolesData[1], // Admin
                permissions: [
                    ...userPermissions,
                    ...rolePermissions,
                    ...permissionPermissions,
                    ...contentPermissions,
                    ...admissionPermissions,
                    ...coursePermissions,
                    ...blogPermissions
                ]
            },
            {
                ...rolesData[2], // Content Manager
                permissions: [
                    ...contentPermissions,
                    ...coursePermissions,
                    ...blogPermissions
                ]
            },
            {
                ...rolesData[3], // Admission Officer
                permissions: [
                    ...admissionPermissions,
                    ...userPermissions.filter(p => permissions.find(perm => perm._id.equals(p)).action === 'read')
                ]
            },
            {
                ...rolesData[4], // Viewer
                permissions: permissions.filter(p => p.action === 'read').map(p => p._id)
            }
        ];
        
        const roles = await Role.insertMany(rolesWithPermissions);
        console.log(`✅ Created ${roles.length} roles`);
        
        return roles;
    } catch (error) {
        console.error('❌ Error seeding roles:', error);
        throw error;
    }
};

// Seed users with roles
const seedUsers = async (roles) => {
    try {
        console.log('🌱 Seeding users...');
        
        // Clear existing users
        await RoleUser.deleteMany({});
        
        // Hash passwords and assign roles
        const usersWithRoles = await Promise.all(
            usersData.map(async (user, index) => {
                const hashedPassword = await bcrypt.hash(user.password, 12);
                return {
                    ...user,
                    password: hashedPassword,
                    role: roles[index]._id
                };
            })
        );
        
        const users = await RoleUser.insertMany(usersWithRoles);
        console.log(`✅ Created ${users.length} users`);
        
        return users;
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        throw error;
    }
};

// Main seeding function
const seedData = async () => {
    try {
        console.log('🚀 Starting RBAC system seeding...\n');
        
        // Connect to database
        await connectDB();
        
        // Seed data in order
        const permissions = await seedPermissions();
        const roles = await seedRoles(permissions);
        const users = await seedUsers(roles);
        
        console.log('\n🎉 RBAC system seeding completed successfully!');
        console.log('\n📋 Summary:');
        console.log(`   • ${permissions.length} permissions created`);
        console.log(`   • ${roles.length} roles created`);
        console.log(`   • ${users.length} users created`);
        
        console.log('\n🔑 Default Login Credentials:');
        users.forEach(user => {
            const role = roles.find(r => r._id.equals(user.role));
            console.log(`   • ${role.name}: ${user.email} / ${userData.find(u => u.email === user.email).password}`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

// Run seeding
seedData(); 