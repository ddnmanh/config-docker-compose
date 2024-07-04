
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import bodyParser from "body-parser"; 
const app = express();

import routes from './src/routes/routes.js';

app.use(cors());

app.use('/statics', express.static(process.env.EXPRESS_PATH_STATIC || './public'));

app.use(bodyParser.json()) // middleware to parse incoming data from HTTP request as JSON and convert them into JavaScript objects
app.use(bodyParser.urlencoded({extended: true})) // Midđleware to parses incoming data from HTTP requests as URL-encoded and converts them into JavaScript objects
 
routes(app);

app.listen(process.env.EXPRESS_APP_PORT, () => {
    console.log(`Example app listening on port ${process.env.EXPRESS_APP_PORT}`)
});