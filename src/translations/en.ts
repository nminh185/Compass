export const en = {
  // Settings
  'settings.changePassword': 'Change Password',
  'settings.language': 'Language',
  'settings.english': 'English',
  'settings.vietnamese': 'Vietnamese',
  
  // Auth
  'auth.currentPassword': 'Current Password',
  'auth.newPassword': 'New Password',
  'auth.confirmPassword': 'Confirm New Password',
  'auth.cancel': 'Cancel',
  'auth.change': 'Change Password',
  'auth.success': 'Password changed successfully!',
  'auth.signIn': 'Sign in to your account',
  'auth.email': 'Email address',
  'auth.password': 'Password',
  'auth.signInButton': 'Sign in',
  
  // Navigation
  'nav.home': 'Home',
  
  // Applications
  'app.myApplications': 'My Applications',
  'app.accessSap': 'Access your SBD Cloud applications',
  'app.updateLocation': 'Update Production Orders Location',
  'app.updateLocationDesc': 'Update location information for production orders',
  'app.massUpdate': 'Mass Update Production Orders',
  'app.massUpdateDesc': 'Update multiple production orders at once',
  'app.displayLocation': 'Display Location of Production Orders',
  'app.displayLocationDesc': 'View location details of all production orders',
  'app.deleteOrders': 'Delete Production Orders',
  'app.deleteOrdersDesc': 'Delete multiple production orders (Admin only)',
  
  // Production Entry
  'production.orderEntry': 'Production Order Entry',
  'production.orderNumber': 'Production Order',
  'production.location': 'Location',
  'production.employeeId': 'Employee ID',
  'production.save': 'Save',
  'production.cancel': 'Cancel',
  'production.duplicateOrder': 'A production order with this number already exists',
  'production.orderRequired': 'Production Order is required',
  'production.locationRequired': 'Location is required',
  'production.employeeIdRequired': 'Employee ID is required',
  'production.orderNumberPlaceholder': 'Enter production order number',
  'production.locationPlaceholder': 'Enter location',
  'production.employeeIdPlaceholder': 'Enter employee ID',
  'production.timestamp': 'Timestamp',
  'production.pasteOrders': 'Paste Production Order Numbers (one per line)',
  'production.orderNumbersPlaceholder': 'Paste order numbers here\nEach order on a new line',
  'production.fillAllFields': 'Please fill in all fields and paste at least one order number',
  'production.updateAll': 'Update All Orders',
  'production.updatedOrders': 'Successfully updated {count} production orders',
  'production.bulkUpdateSuccess': 'Successfully processed orders: {updated} updated, {inserted} inserted',
  'production.noOrders': 'No orders to process',

   // Production List
  'list.title': 'Production Orders',
  'list.subtitle': 'List of all production orders and their locations',
  'list.export': 'Export to Excel',
  'list.newOrder': 'New Order',
  'list.noOrders': 'No production orders found. Click "New Order" to add one.',
  
    // Delete
  'delete.title': 'Delete Production Orders',
  'delete.noPermission': 'You don\'t have permission to access this page. Please contact your administrator.',
  'delete.noOrders': 'Please paste at least one order number',
  'delete.confirmDelete': 'Are you sure you want to delete {count} production orders? This action cannot be undone.',
  'delete.error': 'Failed to delete orders',
  'delete.success': 'Successfully deleted {count} production orders',
  'delete.pasteOrders': 'Paste Production Order Numbers to Delete (one per line)',
  'delete.ordersPlaceholder': 'Paste order numbers here\nEach order on a new line',
  'delete.button': 'Delete Orders',

  // Common
  'common.loading': 'Loading...',
  'common.error': 'An error occurred',
  'common.success': 'Success',
  'common.processing': 'Processing...'
} as const;