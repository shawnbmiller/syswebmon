const express = require('express');
const systeminformation = require('systeminformation');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
    let data = {cpu:null, mem:null, graphics:null, os:null};
    Promise.all([
        systeminformation.cpu()
        .then(cpu => {
            data.cpu = cpu.brand + ' ' + cpu.speed + ' GHz';
        }),
        systeminformation.mem()
        .then(mem => {
            data.mem = Math.round(mem.total / 1024 / 1024 / 1024) + ' GB';
        }),
        systeminformation.graphics(g => {
            data.graphics = g.controllers[0].model;
        }),
        systeminformation.osInfo(os => {
            data.os = os.distro + ' ' + os.release;
        })
    ]).then(() => {
        res.render('index', {data: data});
    });
});

app.listen(3000, () => {
    console.log('The application is running on http://localhost:3000')
});

