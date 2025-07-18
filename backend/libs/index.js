import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";


export const hashPassword = async (userValue) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(userValue, salt);

    return hashedPassword;
}

export const comparePassword = async (userPassword, password) => {
    try {
        const isMatch = bcrypt.compare(userPassword, password);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

export function createJWT(id, email) {
    return JWT.sign({
            userId: id,
            userEmail: email
        }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        }
    )
}