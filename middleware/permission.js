const checkPermission = (resource, action) => {
    return async (req, res, next) => {
      try {
        const user = req.user;
        
        // Super admin has all permissions
        if (user.role.level === 1) {
          return next();
        }
  
        // Check user's direct permissions
        const hasPermission = user.permissions.some(permission => 
          permission.resource === resource && permission.action === action
        );
  
        // Check role permissions
        const hasRolePermission = user.role.permissions.some(permission => 
          permission.resource === resource && permission.action === action
        );
  
        if (hasPermission || hasRolePermission) {
          return next();
        }
  
        return res.status(403).json({ 
          message: `Access denied. Required permission: ${action} on ${resource}` 
        });
      } catch (error) {
        return res.status(500).json({ message: 'Permission check failed' });
      }
    };
  };
  
  export default checkPermission;