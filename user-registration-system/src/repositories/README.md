# To check the status of mysql database

* **login to database:**
    ```bash
    sudo mysql -u root -p
    ```

* **check mysql users:**
    ```bash
    SELECT user, host FROM mysql.user;
    ```

* **check user privileges:**
    ```bash
    SHOW GRANTS FOR 'partcollege'@'localhost';
    ```

* **use specific database:**
    ```bash
    USE user_registration_db;
    ```

* **check tables in database:**
    ```bash
    SHOW TABLES;
    ```

* **Describe a Table Structure:**
    ```bash
    DESCRIBE users;
    ```

* **View Data in a Table:**
    ```bash
    SELECT * FROM users;
    ```

<br>

## create inital tables
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
```

## create Admin User
```sql
INSERT INTO users (username, password, age, email, photo, role)
VALUES ('admin', 'adminpassword', 30, 'admin@example.com', 'adminphoto.jpg', 'admin');
```