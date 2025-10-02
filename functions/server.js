// server.js
import express from 'express';
import cors from 'cors';
import placesRoute from './places.js'; // notice .js extension
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use('/api/places', placesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
