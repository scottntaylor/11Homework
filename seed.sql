DROP DATABASE IF EXISTS employeeTracker_DB;
CREATE DATABASE employeeTracker_DB;

USE employeeTracker_DB;


Create Table department(

  id INT PRIMARY KEY,
  name VARCHAR(30)
);

Create Table role(

  id  INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT 

);

Create Table employees (

  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role VARCHAR (30),
  role_id INT,
  manager_id INT

);

insert employees(first_name, last_name, role, manager_id)
values ("Scott", "Taylor", "Salesperson", 1)