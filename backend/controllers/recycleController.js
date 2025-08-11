import { db } from "../libs/database.js";

// db.connect();

export const getRecycles = async (req, res) => {

    try {
        const response = await db.query(`SELECT * FROM recycle_returns R JOIN addresses A ON R.shipment_address_id = A.id`);
        
        // console.log("Users: ", response);
        
        res.status(200).json({
            status: "success",
            message: "Retreived All users successfully.",
            recyclables: response.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getRecycleById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.query('SELECT * FROM recycle_returns R JOIN addresses A ON R.shipment_address_id = A.id WHERE customer_id = $1', [id]);
        console.log("RR: ", response.rows);
        
        res.status(200).json({
            status: "success",
            message: "Retreived user successfully.",
            recycles: response.rows
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error "});
    }
}