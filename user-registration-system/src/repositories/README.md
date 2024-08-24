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