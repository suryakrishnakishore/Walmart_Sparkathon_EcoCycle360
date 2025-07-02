import cors from "cors";
import express from "express";
import env from "dotenv";
import routes from "./routes/index.js";
import BodyParser from "body-parser";

env.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use(BodyParser.urlencoded({ extended: true }));
app.use("/api-v1", routes);
app.use("*", (req, res) => {
    res.status(404).json({
        status: "Not Found",
        message: "Route Not Found",
    })
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
})