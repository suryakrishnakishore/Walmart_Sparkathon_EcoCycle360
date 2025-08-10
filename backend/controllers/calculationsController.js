import { db } from "../libs/database.js";
import axios from "axios";

// db.connect();

export async function calculateCO2(req, res) {
    try {
        const features = req.body;
        const prediction_datas = {
            plastic: "",
            electronic: "",
            books: "",
            papers: "",
            glass: "",
            clothes: ""
        };
        Object.defineProperty(prediction_datas, 'total_saved', {
            get() {
                return (
                    Number(this.plastic || 0) +
                    Number(this.electronic || 0) +
                    Number(this.books || 0) +
                    Number(this.papers || 0) +
                    Number(this.glass || 0) +
                    Number(this.clothes || 0)
                );
            }
        });

        if (features.plastic > 0) {
            const Presponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "Plastic",
                    "Weight (kg)": features.plastic,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("Plastic response: ", Presponse.data);
            prediction_datas.plastic = Presponse.data.prediction[0]
        }

        if (features.electronic > 0) {
            const Eresponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "E-waste",
                    "Weight (kg)": features.electronic,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("Electronic response: ", Eresponse.data);
            prediction_datas.electronic = Eresponse.data.prediction[0];
        }

        if (features.glass > 0) {
            const Gresponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "Glass",
                    "Weight (kg)": features.glass,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("glass response: ", Gresponse.data);
            prediction_datas.glass = Gresponse.data.prediction[0];
        }

        if (features.books > 0) {
            const Bresponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "Books",
                    "Weight (kg)": features.books,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("books response: ", Bresponse.data);
            prediction_datas.books = Bresponse.data.prediction[0];
        }

        if (features.papers > 0) {
            const PPresponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "Paper",
                    "Weight (kg)": features.papers,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("Papers response: ", PPresponse.data);
            prediction_datas.papers = PPresponse.data.prediction[0];
        }

        if (features.clothes > 0) {
            const Cresponse = await axios.post("http://127.0.0.1:5000/predict", {

                features: {
                    "Material": "Clothes",
                    "Weight (kg)": features.clothes,
                    "Transport Distance (km)": 0,
                    "Region": "India"
                }

            });
            console.log("clothes response: ", Cresponse.data);
            prediction_datas.clothes = Cresponse.data.prediction[0];
        }

        const verify = await db.query(`SELECT EXISTS(SELECT 1 FROM customer_ecocycle WHERE id = $1)`, [
            features.email
        ]);

        if(verify.rows[0].exists) {
            const responce = await db.query('UPDATE customer_ecocycle SET plastic = plastic + $1, e_waste = e_waste + $2, books = books + $3, papers = papers + $4, glass = glass + $5, clothes = clothes + $6, co2_saved = co2_saved + $7 WHERE id = $8', [
                prediction_datas.plastic,
                prediction_datas.electronic,
                prediction_datas.books,
                prediction_datas.papers,
                prediction_datas.glass,
                prediction_datas.clothes,
                prediction_datas.total_saved,
                features.email
            ]);
        }
        else {
            const responce = await db.query('INSERT INTO customer_ecocycle (id, plastic, e_waste, books, papers, glass, clothes, co2_saved) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [
                features.email,
                prediction_datas.plastic,
                prediction_datas.electronic,
                prediction_datas.books,
                prediction_datas.papers,
                prediction_datas.glass,
                prediction_datas.clothes,
                prediction_datas.total_saved,
            ]);

        }
        res.status(201).json({
            status: "success",
            message: "Successfully predicted the amount of CO2 saved.",
            prediction: { ...prediction_datas, saving: prediction_datas.total_saved}
        });
    } catch (err) {
        console.log(err);

        res.status(404).json({
            message: "Failed in predicting the amount of CO2..",
            status: "failed",
            error: err
        });
    }
}