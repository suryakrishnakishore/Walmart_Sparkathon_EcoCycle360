CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    email VARCHAR(255) UNIQUE NOT NULL,
    hsh_password TEXT NOT NULL
);

CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10),
    employee_id VARCHAR(255) UNIQUE NOT NULL,
    hsh_password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    user_id INT,
    CONSTRAINT fk_address FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE placed_orders (
    order_id SERIAL PRIMARY KEY,
    product_ids INT ARRAY,
    payment_mode INT NOT NULL,
    amount DECIMAL(10, 2),
    shipment_address_id INT,
    CONSTRAINT fk_shipments FOREIGN KEY (shipment_address_id) REFERENCES addresses(id) ON DELETE CASCADE,
    ordered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id INT,
    CONSTRAINT fk_orders FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE recycle_returns (
    recycle_id SERIAL PRIMARY KEY,
    shipment_address_id INT,
    CONSTRAINT fk_shipments FOREIGN KEY (shipment_address_id) REFERENCES addresses(id) ON DELETE CASCADE,
    placed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    customer_id INT,
    CONSTRAINT fk_orders FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE 
);

CREATE TABLE customer_ecocycle (
    id INT PRIMARY KEY,
    CONSTRAINT fk_recycles FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    plastic DECIMAL(6, 2),
    e-waste DECIMAL(6, 2),
    books DECIMAL(6, 2),
    papers DECIMAL(6, 2),
    glass DECIMAL(6, 2),
    clothes DECIMAL(6, 2),
    co2_saved DECIMAL(6, 2)
);

