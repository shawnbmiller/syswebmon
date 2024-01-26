// express route for /api/cpu/load
const express = require('express');
const router = express.Router();
const systeminformation = require('systeminformation');

var currentLoad = 0;
valueObject = {
    currentLoad: "currentLoad"
}

function oberverCallback(data){
    currentLoad = data.currentLoad.currentLoad;
}

let observer = systeminformation.observe(valueObject, 500, oberverCallback);


router.get('/load', (req, res) => {
    
        res.json({currentLoad});
    
});

module.exports = router;