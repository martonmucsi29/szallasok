import pool from '../utils/db.js';
import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
    let params = [];
    let szurok = [];

    let sql = `SELECT * FROM szallasok JOIN varosok ON varosok.id = szallasok.varos_id`;

    const {varos, minCsillag, maxAr, medence} = req.query;

    if(varos){
        params.push(varos);
        szurok.push(`varosok.nev = ?`);
    }
    if(minCsillag){
        params.push(minCsillag);
        szurok.push(`szallasok.csillag > ?`);
    }
    if(maxAr){
        params.push(maxAr);
        szurok.push(`szallasok.ar < ?`);
    }
    if(medence){
        params.push(medence === "true" ? 1 : 0);
        szurok.push(`medence = ?`);
    }

    if (szurok.length > 0) {
        sql += ` WHERE ${szurok.join(' AND ')}`;
    }

    let eredmeny = await pool.query(sql, params);
    res.json(eredmeny);
});

export default router;