// src/middlewares/cors.ts
import cors from 'cors';
export default cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});
