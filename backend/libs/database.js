// import Pg from 'pg';
import env from "dotenv";
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';

env.config();

// const { Pool } = Pg;
// // export const db = new Pg.Client({
// //     user: process.env.PG_USER,
// //     host: process.env.PG_HOST,
// //     database: process.env.PG_DATABASE,
// //     password: process.env.PG_PASSWORD,
// //     port: process.env.PG_PORT,
// // });
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const caPath = path.resolve(__dirname, 'ca.pem');

// export const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     ca: fs.readFileSync(caPath).toString(),
//     rejectUnauthorized: true,
//   },
// });


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const db = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  ssl: {
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')).toString(),
    rejectUnauthorized: true
  }
});
