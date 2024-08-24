const mysql = require('mysql2/promise');
const UserRepository = require('./userRepository');

class UserRepositoryMySQL extends UserRepository {
    constructor() {
        super();
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    async createUser(user) {
        try {
            const [result] = await this.connection.execute(
                `INSERT INTO users (username, password, age, email, photo) VALUES (?, ?, ?, ?, ?)`,
                [user.username, user.password, user.age, user.email, user.photo]
            );
            return result.insertId;
        }
        catch(error) {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new Error('username or email already exists')
            }
            // you can log error here!
            throw new Error(`database Error: ${error.message}`);
        }
    }

    async createDocument(doc) {
        const [result] = await this.connection.execute(
            `INSERT INTO user_docs (user_id) VALUES (?)`,
            [doc.userId]
        );
        return result.insertId;
    }

    async getUserByUsername(username) {
        const [rows] = await this.connection.execute(
            `SELECT * FROM users WHERE username = ?`,
            [username]
        );
        return rows[0];
    }

    async updateUser(userId, data) {
        let sql = 'UPDATE users SET ';
        const updates = [];
        const values = [];

        if (data.username) { // username updated
            updates.push('username = ?');
            values.push(data.username);
        }

        if (data.age) { // age updated
            updates.push('age = ?');
            values.push(data.age);
        }

        if (data.email) { // email updated
            updates.push('email = ?');
            values.push(data.email);
        }

        // Ensure at least one field is updated
        if (updates.length === 0) {
            throw new Error('No valid fields provided for update');
        }

        sql += updates.join(', ') + ' WHERE id = ?';
        values.push(userId);

        // Execute the query
        const [result] = await this.connection.execute(sql, values);
        return result.affectedRows > 0;
    }

    async getInactiveUsers() {
        try {
            const [rows] = await this.connection.execute(
                `SELECT * FROM user_docs WHERE status = 'inactive'`
            );
            return rows;
        } catch (error) {
            console.error('Error fetching inactive users:', error.message);
            throw new Error('Database error');
        }
    }
}

module.exports = UserRepositoryMySQL;
