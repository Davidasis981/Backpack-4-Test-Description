You can download test description here: [here +](https://github.com/user-attachments/files/21797378/default.pdf)

# User Registration & Job Scheduling API
This project is a `Node.js` and `Express` application that provides a system for user registration, login, profile management, and job scheduling. The application follows the `Repository design pattern` and includes `JWT-based authentication` and `role-based access control`. Admins can define periodic jobs to be executed, such as activating inactive user files. The project emphasizes security, validation, clean code.

# Features
- **User Registration**: Register users with username, password, age, email, and profile photo.
- **User Login**: Login users using username and password, returning a JWT token.
- **Profile Management**: Allow users to update their profile after logging in.
- **Job Scheduling**: Define, execute, and manage jobs that perform specific tasks at defined intervals.
- **Role-Based Access Control**: Restrict certain actions, such as job management, to admin users only.
- **Security**: Password hashing with salt stored in the `.env` file.
- **Validation**: Input validation for all API endpoints.

# Technologies
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- Multer (for file uploads)
- Bcrypt.js (for password hashing)
- Axios (for making HTTP requests within jobs)

# Setup
### Prerequisites
- Node.js (>=14.x)
- MySQL (>=8.x)

### Installation
1. Clone the repository:
    ```bash
    git clone https://igit.partdp.ir/enansari/final-exam
    cd final-exam
    ```
2. Entering services and installing dependencies:
    - in `job-scheduler`:
        ```bash
        cd job-scheduler
        npm install
        ```
    - in `user-registration-system`:
        ```bash
        cd user-registration-system
        npm install
        ```
3. Set up environment variables (`.env` file)
4. Running services (by default, `user-registration-system` service in `https://localhost:3000` and `job-scheduler` service in `https://localhost:4000` will be available)
    - in `job-scheduler`:
        ```bash
        cd job-scheduler
        node app.js
        ```
    - in `user-registration-system`:
        ```bash
        cd user-registration-system
        node app.js
        ```

# Environment Variables
```plaintext
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=user_registration_db
JWT_SECRET=your_jwt_secret_key
```

# Database Setup
1. Start your MySQL server and create the necessary database:
    ```sql
    CREATE DATABASE user_registration_db;
    ```
2. Create the `users`, `user_docs` and `jobs` tables:
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        photo VARCHAR(255),
        role ENUM('normal', 'admin') DEFAULT 'normal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE user_docs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        doc_name VARCHAR(255) DEFAULT 'college',
        status ENUM('active', 'inactive') DEFAULT 'inactive',
        FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE jobs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        startAt DATETIME,
        endAt DATETIME,
        pattern INT,
        method VARCHAR(10),
        target VARCHAR(255)
    );
    ```

# create Admin User
```sql
INSERT INTO users (username, password, age, email, photo, role)
VALUES ('admin', 'adminpassword', 30, 'admin@example.com', 'adminphoto.jpg', 'admin');
```

# API Endpoints
You can download my post collection file including APIs for the following items from 👉[**here +**](uploads/9776f8ac9b7b9943ae6d066b6d485c71/final_exam.postman_collection.json)👈.
- user
    - add user
    - login (to get token)
    - edit (login required)
    - admin only (just admin - for test authorization)
    - get inactive users
    - get all users (just admin)
    - get all user docs (just admin)
    - active user docs manual (for testing api to job)
- job
    - add job (just admin)
    - remove job (just admin)
    - get all jobs (just admin)

# Validation
All API inputs are validated using `express-validator`. Validation middleware ensures that required fields are present and formatted correctly.

# Security Considerations
- Passwords are hashed with `bcrypt` using a `salt` from the `.env` file.
- `JWT` is used for authentication, and sensitive routes are protected using role-based access control.
- The `.env` file should never be committed to version control.
