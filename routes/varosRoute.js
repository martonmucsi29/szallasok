import pool from '../utils/db.js';
import { Router } from 'express';

const varrouter = Router();

varrouter.get('/', async (req, res) => {
    let sql = `SELECT varosok.id, varosok.nev, varosok.orszag, COUNT(szallasok.varos_id) FROM varosok JOIN szallasok ON szallasok.varos_id = varosok.id GROUP BY varosok.nev`;

    let eredmeny = await pool.query(sql);
    res.json(eredmeny);
});

export default varrouter;
