INSERT INTO department (name)
VALUES
    ('Art'),
    ('Finance'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Art Manager', 30000, 1),
    ('Finance Manager', 50000, 2),
    ('Engineering Manager', 70000, 3),
    ('Art Intern', 20000, 1),
    ('Finance Intern', 20000, 2),
    ('Engineering Intern', 20000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Dubu', 'Kim', 1, NULL),
    ('Ari', 'Kim', 3, 1);