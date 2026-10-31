/**
 * Role-based access control utilities
 */

// Get user data from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  }
  return null;
};

// Get user role
export const getUserRole = () => {
  const user = getUser();
  return user ? user.role : null;
};

// Check if user has a specific role
export const hasRole = (role) => {
  const userRole = getUserRole();
  return userRole === role;
};

// Check if user has any of the specified roles
export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};

// Check if user is Admin
export const isAdmin = () => {
  return hasRole('ADMIN');
};

// Check if user is Doctor
export const isDoctor = () => {
  return hasRole('DOCTOR');
};

// Check if user is Patient
export const isPatient = () => {
  return hasRole('PATIENT');
};

// Get role-based menu items (for Sidebar)
export const getRoleBasedMenuItems = () => {
  const role = getUserRole();

  const allMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊', roles: ['ADMIN', 'DOCTOR', 'PATIENT'] },
    { path: '/patients', label: 'Patients', icon: '👥', roles: ['ADMIN', 'DOCTOR'] },
    { path: '/doctors', label: 'Doctors', icon: '👨‍⚕️', roles: ['ADMIN'] },
    { path: '/appointments', label: 'Appointments', icon: '📅', roles: ['ADMIN', 'DOCTOR', 'PATIENT'] },
    { path: '/billing', label: 'Billing', icon: '💰', roles: ['ADMIN'] }, // Patient removed
    { path: '/prescriptions', label: 'Prescriptions', icon: '💊', roles: ['ADMIN', 'DOCTOR'] }, // Patient removed
    { path: '/medicines', label: 'Pharmacy', icon: '💉', roles: ['ADMIN', 'DOCTOR'] },
    { path: '/lab-tests', label: 'Lab Tests', icon: '🔬', roles: ['ADMIN', 'DOCTOR'] }, // Patient removed
    { path: '/reports', label: 'Reports', icon: '📈', roles: ['ADMIN'] },
    { path: '/notifications', label: 'Notifications', icon: '🔔', roles: ['ADMIN', 'DOCTOR', 'PATIENT'] }, // Added
  ];

  if (!role) return [];

  return allMenuItems.filter(item => item.roles.includes(role));
};

// Check if a route is accessible for current user (for route guard)
export const canAccessRoute = (routePath) => {
  const role = getUserRole();
  if (!role) return false;

  const routePermissions = {
    '/dashboard': ['ADMIN', 'DOCTOR', 'PATIENT'],
    '/patients': ['ADMIN', 'DOCTOR'],
    '/doctors': ['ADMIN'],
    '/appointments': ['ADMIN', 'DOCTOR', 'PATIENT'],
    '/billing': ['ADMIN'], // Patient removed
    '/prescriptions': ['ADMIN', 'DOCTOR'], // Patient removed
    '/medicines': ['ADMIN', 'DOCTOR'],
    '/lab-tests': ['ADMIN', 'DOCTOR'], // Patient removed
    '/reports': ['ADMIN'],
    '/notifications': ['ADMIN', 'DOCTOR', 'PATIENT'], // Added
    '/profile-check': ['PATIENT'],
    '/complete-profile': ['PATIENT'],
  };

  const allowedRoles = routePermissions[routePath];
  return allowedRoles ? allowedRoles.includes(role) : false;
};