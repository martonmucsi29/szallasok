import 'dotenv/config';
import express from 'express';
import szallasokroute from './routes/szallasokRoute.js';
import varosroute from './routes/varosRoute.js';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3000);

app.use('/szallasok', szallasokroute);
app.use('/varosok', varosroute);

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));