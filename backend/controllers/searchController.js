import { db } from "../libs/database.js";

db.connect();

export const getByMail = async (req, res) => {
    const { query } = req.query;
    if (!query || query.length < 2) return res.json([]);

    try {
        const response = await db.query(`SELECT name, email FROM users WHERE email ILIKE $1 ORDER BY email LIMIT 5`, [
            `${query}%`
        ]);
        
        // console.log("Suggestions response: ", response);
        
        res.status(200).json({
            status: "success",
            message: "List of suggestions generated.",
            list: response.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getByName = async (req, res) => {
    const { query } = req.query;
    if (!query || query.length < 2) return res.json([]);

    try {
        const response = await db.query(`SELECT * FROM users WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY name`, [
            `%${query}%`
        ]);
        
        // console.log("Suggestions response: ", response);
        
        res.status(200).json({
            status: "success",
            message: "List of suggestions generated.",
            list: response.rows
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}