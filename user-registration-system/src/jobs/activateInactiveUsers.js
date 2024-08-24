const UserRepository = require('../repositories/userRepositoryMySQL');

const userRepository = new UserRepository();

module.exports = async function activateInactiveUsers(req, res) {    
    const allResults = []
    const inactiveUsers = await userRepository.getInactiveUsers();
    for(const user of inactiveUsers) {
        try {
            const result = await userRepository.updateUserStatus(user.id, 'active');
            allResults.push(result);
        }
        catch(error) {
            allResults.push(error.message)
        }
    }
    res.json({'result': allResults});
};
