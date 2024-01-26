const express = require('express');
class Routes {
    constructor() {
        this.router = express.Router();
        this.router.use('/cpu', require('./cpu/routes'));
        this.router.use('/mem', require('./mem/routes'));
    }
}
module.exports = new Routes().router;