// express route for /api/cpu/load
const express = require('express');
const router = express.Router();
const systeminformation = require('systeminformation');
router.get('/load', (req, res) => {
    systeminformation.currentLoad(currentLoad => {
        res.json(currentLoad);
    });
});
router.get('/mem', (req, res) => {
    systeminformation.mem(mem => {
        
        res.json(mem);
    });
});
module.exports = router;