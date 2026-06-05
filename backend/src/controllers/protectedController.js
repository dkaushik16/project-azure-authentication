/**
 * Protected API Controller
 * 
 * Handles protected endpoints that require valid JWT authentication
 */

/**
 * Get Users Endpoint
 * 
 * Returns a list of users
 * Accessible only with valid Azure AD JWT token
 * 
 * @param {Object} req - Express request (contains auth info in req.auth)
 * @param {Object} res - Express response
 */
export const getUsers = (req, res) => {
  const userId = req.auth?.oid || req.auth?.sub || 'unknown';

  res.json({
    message: 'Users fetched successfully',
    calledBy: userId,
    data: [
      {
        id: 1,
        name: 'Alice Johnson',
        role: 'Admin',
        department: 'Engineering',
        status: 'active',
      },
      {
        id: 2,
        name: 'Bob Smith',
        role: 'Developer',
        department: 'Engineering',
        status: 'active',
      },
      {
        id: 3,
        name: 'Carol White',
        role: 'Designer',
        department: 'Product',
        status: 'away',
      },
      {
        id: 4,
        name: 'David Lee',
        role: 'Manager',
        department: 'Operations',
        status: 'active',
      },
      {
        id: 5,
        name: 'Eva Martinez',
        role: 'Analyst',
        department: 'Finance',
        status: 'offline',
      },
    ],
  });
};

/**
 * Get Products Endpoint
 * 
 * Returns a list of products
 * Accessible only with valid Azure AD JWT token
 * 
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const getProducts = (req, res) => {
  res.json({
    message: 'Products fetched successfully',
    data: [
      {
        id: 101,
        name: 'Laptop Pro X',
        category: 'Electronics',
        price: 1299.99,
        stock: 45,
      },
      {
        id: 102,
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 199.99,
        stock: 120,
      },
      {
        id: 103,
        name: 'Standing Desk',
        category: 'Furniture',
        price: 599.99,
        stock: 30,
      },
      {
        id: 104,
        name: 'Ergonomic Chair',
        category: 'Furniture',
        price: 449.99,
        stock: 25,
      },
      {
        id: 105,
        name: 'USB-C Hub',
        category: 'Accessories',
        price: 79.99,
        stock: 200,
      },
    ],
  });
};

/**
 * Get Dashboard Stats Endpoint
 * 
 * Returns dashboard analytics and statistics
 * Accessible only with valid Azure AD JWT token
 * 
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const getDashboardStats = (req, res) => {
  res.json({
    message: 'Dashboard stats fetched successfully',
    data: {
      totalUsers: 1240,
      activeUsers: 893,
      revenue: 142580.5,
      ordersToday: 76,
      growthRate: '12.4%',
      recentActivity: [
        { event: 'New user signup', time: '2 minutes ago' },
        { event: 'Order #4521 placed', time: '5 minutes ago' },
        { event: 'Product updated', time: '12 minutes ago' },
        { event: 'Report generated', time: '1 hour ago' },
      ],
    },
  });
};

export default {
  getUsers,
  getProducts,
  getDashboardStats,
};
