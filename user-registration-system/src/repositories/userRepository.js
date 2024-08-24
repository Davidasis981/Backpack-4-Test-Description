class UserRepository {
    async createUser(user) {}
    async findUserByUsername(username) {}
    async updateUser(user) {}

    async getUserByUsername(username) {
        try {
          // SQL query to select user by username
          const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
    
          // Check if a user was found
          if (rows.length > 0) {
            return rows[0]; // Return the first matched user
          } else {
            return null; // No user found
          }
        } catch (error) {
          // Handle SQL errors or other issues
          console.error('Error fetching user by username:', error);
          throw new Error('Database error');
        }
      }

}
  
module.exports = UserRepository;