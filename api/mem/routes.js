const express = require('express');
const router = express.Router();
const systeminformation = require('systeminformation');

var totalMem = 0;
var freeMem = 0;
var usedMem = 0;

function oberverCallback(data){
    totalMem = data.mem.total;
    freeMem = data.mem.free;
    usedMem = data.mem.used;
}

let dataValues = {
    mem: "total, free, used"
}

let observer = systeminformation.observe(dataValues, 500, oberverCallback);

router.get('/usage', (req, res) => {
    res.json({totalMem, freeMem, usedMem});
});

module.exports = router;