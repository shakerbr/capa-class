CREATE DATABASE restaurant;
USE restaurant;
SELECT DATABASE();


-- ---------------------------------------------
--                 Schema
-- ---------------------------------------------

CREATE TABLE customers (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(150) NOT NULL,
phone VARCHAR(20)
);

CREATE TABLE orders (
id INT PRIMARY KEY AUTO_INCREMENT,
customer_id INT NOT NULL,
date DATE NOT NULL
);

CREATE TABLE meals (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(150) NOT NULL,
price INT NOT NULL,
description TEXT
);

CREATE TABLE order_details (
id INT PRIMARY KEY AUTO_INCREMENT,
order_id INT NOT NULL,
meal_id INT NOT NULL,
quantity INT NOT NULL
);

SHOW TABLES;

-- Foreign key with references, in case they are required: 
ALTER TABLE orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id);
ALTER TABLE order_details ADD FOREIGN KEY (order_id) REFERENCES orders(id), ADD FOREIGN KEY (meal_id) REFERENCES meals(id);

-- ---------------------------------------------
--                 Data Insertion
-- ---------------------------------------------

INSERT INTO meals (name, price, description) VALUES
	('Pizza', 5, 'Italian Pizza with Pepperoni'),
	('Burger', 3, '250g burger (middle size)'),
	('steak', 8, 'beef, 150g'),
	('Fries', 2, ''),
	('Coca Cola', 1, '450ml can');

INSERT INTO customers (name, phone) VALUES 
	('Suliman', '9647504321234'),
	('Sarbast', '9647504421231'),
	('Ismat', '9647512235617'),
	('Hevi', '9647813512815'),
	('Salwa', '9647731128312');

INSERT INTO orders (customer_id, date) VALUES 
	(2, '2026-06-02'),
	(3, '2026-06-03'),
	(1, '2026-06-03'),
	(5, '2026-06-04'),
	(3, '2026-06-04'),
	(2, '2026-06-02'),
	(3, '2026-06-03'),
	(2, '2026-06-03'),
	(4, '2026-06-04'),
	(3, '2026-06-04');

INSERT INTO order_details (order_id, meal_id, quantity) VALUES 
	(1, 2, 1),
	(1, 1, 1),
	(2, 1, 1),
	(2, 5, 2),
	(3, 4, 1),
	(4, 1, 2),
	(4, 2, 1),
	(4, 5, 3),
	(5, 1, 2),
	(6, 2, 1),
	(6, 1, 1),
	(7, 1, 1),
	(7, 5, 2),
	(7, 4, 1),
	(8, 1, 2),
	(9, 2, 1),
	(9, 5, 3),
	(10, 1, 2);


-- ---------------------------------------------
--                 Queries
-- ---------------------------------------------

-- A. Basic
-- 1
SELECT * FROM customers;

-- 2
SELECT * FROM meals ORDER BY price ASC;

-- Note: Price is USD

-- B. Joins
-- 3
SELECT 
	o.id AS "Order ID", 
	c.name AS "Customer Name", 
	o.date AS "Date"
FROM orders o 
LEFT JOIN customers c ON o.customer_id = c.id;

-- 4
SELECT 
	c.name AS "Customer Name", 
	m.name AS "Meal", 
	od.quantity AS "Quantity"
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
INNER JOIN order_details od ON o.id = od.order_id
INNER JOIN meals m ON m.id = od.meal_id;


-- C. Aggregate
-- 5
SELECT count(*) AS "Total Number of Customers" FROM customers;

-- 6
SELECT MAX(price) AS "Most Expensive Price" FROM meals;
-- Note: Above was just displaying the most expensive price without meal name, but we want the meal name too.
-- It's easy if we used limit, but the query is in `Aggregate` group, but I'm not sure if we're strict to use aggregation. 
-- Using limit:
SELECT name AS "Most Expensive Meal", price FROM meals ORDER BY price DESC LIMIT 1;
-- BUT using aggregate isn't easy, I don't know a way to get the required result without nesting queries. Here's a solution that includes nesting:
SELECT 
    name AS "Most Expensive Meal", 
    price AS "Price"
FROM meals
WHERE price = (SELECT MAX(price) FROM meals);


-- D. Groups
-- 7
SELECT 
	m.name AS "Meal Name", 
	SUM(od.quantity) AS "Quantity Sold"
FROM order_details od 
INNER JOIN meals m ON m.id = od.meal_id
GROUP BY m.name;

-- 8
SELECT 
    c.id AS "ID",
    c.name AS "Best Customer", 
    COUNT(o.id) AS "Total Orders"
FROM customers c
INNER JOIN orders o ON c.id = o.customer_id
GROUP BY c.id
ORDER BY `Total Orders` DESC
LIMIT 1;


-- E. Advanced
-- 9
SELECT 
	m.id,
	m.name
FROM meals m
LEFT JOIN order_details od ON m.id = od.meal_id
WHERE od.id IS NULL;

-- 10
SELECT 
    c.id,
    c.name,
    SUM(m.price * od.quantity) AS "Total Spent"
FROM orders o
INNER JOIN customers c ON c.id = o.customer_id
INNER JOIN order_details od ON o.id = od.order_id
INNER JOIN meals m ON m.id = od.meal_id
GROUP BY c.id;

-- 11
SELECT AVG(total_price) as "Average Order Amount"
FROM (
	SELECT 
	    od.order_id,
	    SUM(m.price * od.quantity) AS total_price
	FROM order_details od
	INNER JOIN meals m ON od.meal_id = m.id
	GROUP BY od.order_id
) AS total_prices;

-- Class note: Try doing it without nesting. 
-- The query without nesting:
SELECT 
    SUM(m.price * od.quantity) / COUNT(DISTINCT od.order_id) AS "Average Order Amount"
FROM order_details od
INNER JOIN meals m ON od.meal_id = m.id;

-- 12
SELECT 
	c.id,
	c.name,
	COUNT(o.id) AS "Total Orders"
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id
GROUP BY c.id
HAVING `Total Orders` > 3;