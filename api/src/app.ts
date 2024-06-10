import express from 'express';
import cors from 'cors';
import {FRONTEND_URL, PORT} from './config/serverConfig';
import errorHandler from './utils/errorHandler';
import ApiRoutes from './routes/index';
import 'colors';
const setupAndStartServer = async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin:FRONTEND_URL
    }));
    app.use('/api', ApiRoutes);
    app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`[LOG] : CollegeConnect Backend is listening on port ${PORT}`.green.bold);
    });
    app.get('/', (req, res) => res.send(`<h1>CollegeConnect Backend is up and running</h1>`));
}

setupAndStartServer();
