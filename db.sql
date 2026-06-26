#Category table
CREATE TABLE category (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description VARCHAR(255)
    );
#Pharmacy item table
CREATE TABLE pharmacy_items(
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    item_name VARCHAR(150) NOT NULL,
    manufacturer VARCHAR(150),
    quantity INT DEFAULT 0,
     reorder_level INT DEFAULT 10,
    expire_date DATE,
    unit_price DECIMAL(10,2),
    
    CONSTRAINT fk_category
      FOREIGN KEY (category_id)
      REFERENCES category(category_id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    );
 #Alert table 
 
 CREATE TABLE alerts (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    alert_type VARCHAR(50) NOT NULL,
    message TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_item
        FOREIGN KEY (item_id)
        REFERENCES pharmacy_items(item_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
    
   CREATE TABLE sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT NOT NULL,
    quantity_sold INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    sale_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sale_item
    FOREIGN KEY(item_id)
    REFERENCES pharmacy_items(item_id)
    ON DELETE CASCADE
); 