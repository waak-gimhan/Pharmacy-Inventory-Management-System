import express from 'express';
import cors from 'cors';
import conn from './config/config.js'; 

const app = express();

app.use(cors());
app.use(express.json());

// Get all categories(GET API)
app.get('/categories', (req, res) => {

    const sql = 'SELECT * FROM category';

    conn.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

//POST all categories(POST API)
app.post('/categories', (req, res) => {

    const { category_name, description } = req.body;

    const sql =
        'INSERT INTO category(category_name, description) VALUES (?, ?)';

    conn.query(
        sql,
        [category_name, description],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Category Added',
                id: result.insertId
            });

        }
    );

});

//GET all products(GET product API)
app.get('/products', (req, res) => {

    const sql = `
        SELECT
            p.item_id,
            p.category_id,
            p.item_name,
            p.manufacturer,
            p.quantity,
            p.expire_date,
            p.unit_price,
            c.category_name
        FROM pharmacy_items p
        JOIN category c
        ON p.category_id = c.category_id
    `;

    conn.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

//POST all products(POST product API)
app.post('/products', (req, res) => {

    const {
        category_id,
        item_name,
        manufacturer,
        quantity,
        expire_date,
        unit_price
    } = req.body;

    const sql = `
        INSERT INTO pharmacy_items
        (
            category_id,
            item_name,
            manufacturer,
            quantity,
            expire_date,
            unit_price
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    conn.query(
        sql,
        [
            category_id,
            item_name,
            manufacturer,
            quantity,
            expire_date,
            unit_price
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product Added',
                id: result.insertId
            });

        }
    );

});

//category delete API
app.delete('/categories/:id', (req, res) => {

    const sql = "DELETE FROM category WHERE category_id = ?";

    conn.query(sql, [req.params.id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Category Deleted"
        });

    });

});

//product delete API

app.delete('/products/:id', (req, res) => {

    const sql = 'DELETE FROM pharmacy_items WHERE item_id = ?';

    conn.query(
        sql,
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product Deleted'
            });

        }
    );

});

//product Update API

app.put('/products/:id', (req, res) => {


    const {
        category_id,
        item_name,
        manufacturer,
        quantity,
        expire_date,
        unit_price
    } = req.body;

    const sql = `
        UPDATE pharmacy_items
        SET
            category_id = ?,
            item_name = ?,
            manufacturer = ?,
            quantity = ?,
            expire_date = ?,
            unit_price = ?
        WHERE item_id = ?
    `;

    conn.query(
        sql,
        [
            category_id,
            item_name,
            manufacturer,
            quantity,
            expire_date,
            unit_price,
            req.params.id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Product Updated'
            });

        }
    );

});

//Add stock API (PUT)





app.put('/products/:id/add-stock', (req, res) => {

    const { quantity } = req.body;

    const getSql =
        'SELECT quantity FROM pharmacy_items WHERE item_id = ?';

    conn.query(
        getSql,
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            const currentQty = result[0].quantity;
            const newQty = currentQty + quantity;

            const updateSql =
                'UPDATE pharmacy_items SET quantity = ? WHERE item_id = ?';

            conn.query(
                updateSql,
                [newQty, req.params.id],
                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        message: 'Stock Added',
                        oldQuantity: currentQty,
                        addedQuantity: quantity,
                        newQuantity: newQty
                    });

                }
            );

        }
    );

});
//Alert API
app.get('/alerts', (req, res) => {

    const sql = `
        SELECT
            a.alert_id,
            a.alert_type,
            a.message,
            a.created_at,
            p.item_name
        FROM alerts a
        JOIN pharmacy_items p
        ON a.item_id = p.item_id
        ORDER BY a.created_at DESC
    `;

    conn.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

//Sales API

app.post("/sales", (req, res) => {

    const { item_id, quantity_sold } = req.body;

    const productSql = `
        SELECT item_name, quantity, unit_price
        FROM pharmacy_items
        WHERE item_id = ?
    `;

    conn.query(productSql, [item_id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        const product = result[0];

        if (quantity_sold > product.quantity) {

            return res.status(400).json({
                message: "Not enough stock available"
            });

        }

        const remaining = product.quantity - quantity_sold;

        const total = quantity_sold * product.unit_price;

        const updateStock = `
            UPDATE pharmacy_items
            SET quantity = ?
            WHERE item_id = ?
        `;

        conn.query(updateStock,
            [remaining, item_id],
            (err) => {

                if (err)
                    return res.status(500).json(err);

                const saleSql = `
                    INSERT INTO sales
                    (
                        item_id,
                        quantity_sold,
                        unit_price,
                        total_amount
                    )
                    VALUES (?,?,?,?)
                `;

                conn.query(

                    saleSql,

                    [
                        item_id,
                        quantity_sold,
                        product.unit_price,
                        total
                    ],

                    (err) => {

                        if (err)
                            return res.status(500).json(err);

                        if (remaining < 10) {

                            const alertSql = `
                                INSERT INTO alerts
                                (
                                    item_id,
                                    alert_type,
                                    message
                                )
                                VALUES (?,?,?)
                            `;

                            conn.query(

                                alertSql,

                                [
                                    item_id,
                                    "LOW_STOCK",
                                    `${product.item_name} stock is low. Quantity = ${remaining}`
                                ]

                            );

                        }

                        res.json({

                            message: "Sale completed",

                            remaining_stock: remaining,

                            total_amount: total

                        });

                    }

                );

            }

        );

    });

});

//GET Sales API
app.get("/sales", (req, res) => {

    const sql = `
        SELECT

        s.sale_id,

        p.item_name,

        s.quantity_sold,

        s.unit_price,

        s.total_amount,

        s.sale_date

        FROM sales s

        JOIN pharmacy_items p

        ON s.item_id = p.item_id

        ORDER BY s.sale_date DESC
    `;

    conn.query(sql, (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

});






app.listen(3000, ()=>{
    console.log("sever is running on port 3000");
});