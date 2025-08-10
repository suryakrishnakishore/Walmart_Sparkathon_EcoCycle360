import { db } from "../libs/database.js";
import { comparePassword, createJWT, hashPassword } from "../libs/index.js";


// db.connect();

export const signinUser = async (req, res) => {
    try {
        const { email, password }= req.body;
        
        if(!(email || password)) {
            return res.status(404).json({
                status: "failed",
                message: "Provide Required Fields!",
            })
        }

        const user = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
        console.log(user);
        
        if(!user.rows[0]) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid Email or Password",

            });
        }

        const isMatch = await comparePassword(password, user.rows[0]?.hsh_password);

        if(!isMatch) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid Email or Password",

            });
        }

        const token = createJWT(user.rows[0].id);

        res.status(200).json({
            status: "success",
            message: "User loggedIn successfully",
            user: user.rows[0],
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            message: err.message,
        })
    }
}

export const signinAdmin = async (req, res) => {
    try {
        const { employee_id, password }= req.body;
        
        if(!(employee_id || password)) {
            return res.status(404).json({
                status: "failed",
                message: "Provide Required Fields!",
            })
        }

        const user = await db.query(`SELECT * FROM admins WHERE employee_id = $1`, [employee_id]);
        console.log(user);
        
        if(!user.rows[0]) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid Email or Password",

            });
        }

        const isMatch = await comparePassword(password, user.rows[0]?.hsh_password);

        if(!isMatch) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid Email or Password",

            });
        }

        const token = createJWT(user.rows[0].id);

        res.status(200).json({
            status: "success",
            message: "User loggedIn successfully",
            user: user.rows[0],
            token,
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            message: err.message,
        })
    }
}

// export const signupUser = async (req, res) => {
//     try {
//         const { name, gender, employee_id, password }= req.body;
        
//         if(!(name || gender || employee_id || password)) {
//             return res.status(404).json({
//                 status: "failed",
//                 message: "Provide Required Fields!",
//             })
//         }

//         const userExist = await db.query(`SELECT EXISTS (SELECT * FROM admins WHERE employee_id = $1)`, [employee_id]);
//         console.log(userExist);

//         if(userExist.rows[0].userExist){
//             return res.status(404).json({
//                 status: "failed",
//                 message: "employee_id Address already exists. Try LoggingIn"
//             })
//         }
//         const hashedPassword = await hashPassword(password);

//         const responce = await db.query(`INSERT INTO admins (name, gender, employee_id, hsh_password) VALUES ($1, $2, $3, $4) RETURNING *`,[
//             name,
//             gender,
//             employee_id,
//             hashedPassword
//         ]);

//         res.status(201).json({
//             status: "success",
//             message: "User account created successfully",
//             user: responce.rows[0],
//         });

//     } catch (err) {
//         console.log(err);
//         res.status(404).json({
//             status: "failed",
//             message: err.message,
//         })
//     }
// }

export const signupUser = async (req, res) => {
    try {
        const { name, gender, email, password }= req.body;
        
        if(!(name || gender || email || password)) {
            return res.status(404).json({
                status: "failed",
                message: "Provide Required Fields!",
            })
        }

        const userExist = await db.query(`SELECT EXISTS (SELECT * FROM users WHERE email = $1)`, [email]);
        console.log(userExist);

        if(userExist.rows[0].userExist){
            return res.status(404).json({
                status: "failed",
                message: "Email Address already exists. Try LoggingIn"
            })
        }
        const hashedPassword = await hashPassword(password);

        const responce = await db.query(`INSERT INTO users (name, gender, email, hsh_password) VALUES ($1, $2, $3, $4) RETURNING *`,[
            name,
            gender,
            email,
            hashedPassword
        ]);

        res.status(201).json({
            status: "success",
            message: "User account created successfully",
            user: responce.rows[0],
        });

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed",
            message: err.message,
        })
    }
}