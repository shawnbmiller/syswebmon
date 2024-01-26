const express = require('express');
const systeminformation = require('systeminformation');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');



app.use(express.static('public'));
app.use('/api', require('./api/routes'));
app.get('/', (req, res) => {
    let data = {cpu:null, mem:null, graphics:null, os:null};
    Promise.all([
        systeminformation.cpu()
        .then(cpu => {
            data.cpu = cpu.brand + ' ' + cpu.speed + ' GHz';
        }).catch(error => {
            data.cpu = 'Unavailable';
        }),
        systeminformation.mem()
        .then(mem => {
            data.mem = Math.round(mem.total / 1024 / 1024 / 1024) + ' GB';
        }).catch(error => {
            data.mem = 'Unavailable';
        }),
        systeminformation.graphics(g => {
            data.graphics = g.controllers[0].model;
        }).catch(error => {
            data.graphics = 'Unavailable';
        }),
        systeminformation.osInfo(os => {
            data.os = os.distro + ' ' + os.release;
        }).catch(error => {
            data.os = 'Unavailable';
        })
    ]).then(() => {
        res.render('index', {data: data});
    });
});

app.listen(3000, () => {
    console.log('The application is running on http://localhost:3000')
});
