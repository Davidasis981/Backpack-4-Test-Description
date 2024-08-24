class UserRepository {
    async createUser(user) {}
    async getUserByUsername(username) {}
    async createDocument(doc) {}
    async updateUser(userId, data) {}
    async getInactiveUsers() {}
    async updateUserStatus(userId, status) {}
}
  
module.exports = UserRepository;