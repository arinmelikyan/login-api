import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import api from './src/routes/api.js';
import { port } from './src/configs/config.js';
import './src/configs/database.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', api);

app.listen(port, () => console.log(`server is running on port ${port}`));