# create job table
```sql
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    startAt DATETIME,
    endAt DATETIME,
    pattern INT,
    method VARCHAR(10),
    target VARCHAR(255)
);
```