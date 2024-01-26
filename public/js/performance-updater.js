// fetch json from /api/cpu/load
// update #cpuload with the value
function updateCpuLoad() {
    fetch('/api/cpu/load')
        .then(res => res.json())
        .then(data => {
            document.querySelector('#cpuload').innerText = data.currentLoad.toFixed(2) + '%';
        });
}
// update every 1 second
setInterval(updateCpuLoad, 1000);
// fetch json from /api/cpu/mem
// update #mem with the value
function updateMem() {
    fetch('/api/mem/usage')
        .then(res => res.json())
        .then(data => {
            document.querySelector('#mem').innerText = ((data.usedMem)/ 1024 / 1024 / 1024).toFixed(2) + ' GB' + ' of ' + ((data.totalMem)/ 1024 / 1024 / 1024).toFixed(2) + ' GB';
        });
}
// update every 1 second
setInterval(updateMem, 1000);


