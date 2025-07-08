import { db } from "../libs/database.js";

db.connect();

export const getUsers = async (req, res) => {

    try {
        const response = await db.query(`SELECT * FROM users`);
        
        // console.log("Users: ", response);
        
        res.status(200).json({
            status: "success",
            message: "Retreived All users successfully.",
            users: response.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        res.status(200).json({
            status: "success",
            message: "Retreived user successfully.",
            user: response.rows[0]
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error "});
    }
}