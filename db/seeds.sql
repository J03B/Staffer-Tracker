INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Executive"),
        ("Sales"),
        ("Legal"),
        ("Accounting");

INSERT INTO role (title, salary, department_id)
VALUES  ("Software Engineer", 120000, 1),
        ("Senior Engineer", 160000, 1),
        ("Quality Manager", 80000, 1),
        ("CEO", 280000, 2),
        ("CIO", 220000, 2),
        ("CFO", 240000, 2),
        ("Salesperson", 70000, 3),
        ("Sales Lead", 90000, 3),
        ("Lawyer", 190000, 4),
        ("Legal Team Lead", 230000, 4),
        ("Accountant", 110000, 5),
        ("Account Manager", 140000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Toby", "Flenderson", 4, NULL),
        ("Ryan", "Howard", 5, NULL),
        ("David", "Wallace", 6, NULL),
        ("Gabriel", "Lewis", 2, NULL),
        ("Andrew", "Bernand", 10, NULL),
        ("Jim", "Halpert", 8, NULL),
        ("Angela", "Martin", 12, NULL),
        ("Michael", "Scott", 1, 4),
        ("Karen", "Filapeli", 1, 4),
        ("Meredith", "Palmer", 3, 4),
        ("Dwight", "Schrute", 7, 6),
        ("Pam", "Beasley", 7, 6),
        ("Darryl", "Philbin", 9, 5),
        ("Phyllis", "Vance", 7, 6),
        ("Oscar", "Martinez", 11, 7),
        ("Creed", "Braton", 1, 4),
        ("Kevin", "Malone", 11, 7),
        ("Kelly", "Kapoor", 9, 5);
