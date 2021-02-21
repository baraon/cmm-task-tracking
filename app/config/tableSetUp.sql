CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE customers (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE projects (
    id int NOT NULL AUTO_INCREMENT,
    customer_id int NOT NULL,
    name varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE tasks (
    id int NOT NULL AUTO_INCREMENT,
    description varchar(255) NOT NULL,
    project_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE task_logs (
    id int NOT NULL AUTO_INCREMENT,
    duration_minutes int,
    task_id int NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);