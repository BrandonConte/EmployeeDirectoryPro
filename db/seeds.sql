INSERT INTO department (department_name)
VALUES
    ('Sales'),
    ('Support'),
    ('Marketing'),
    ('Executive');
INSERT INTO roles (title, salary, department_id)
VALUES
    ('Manager', 10000, 1),
    ('Assistant Manager', 9500, 1),
    ('Sales Lead', 8000, 2),
    ('Sales Associate', 6000, 2),
    ('Support Lead', 4000, 3),
    ('Support Associate', 3500, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Brandon', 'Jones', 1, NULL),
    ('Jack', 'Taylor', 2, 1),
    ('Beau', 'Johnson', 3, NULL),
    ('Archibald', 'Jackson', 4, 3),
    ('Johnny', 'Rocket', 5, NULL),
    ('Timon', 'Pumba', 6, 5);