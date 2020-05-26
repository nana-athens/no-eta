'use-strict';
const mainMessage = document.querySelector('#main-message');
const daButton = document.querySelector('#da-button');
const daPatchButton = document.querySelector('#da-patch-button');

let maintenanceData = [];
let maintenancePatchData = [];

function getMessages() {
    const url = "./maintenance.json";
    fetch(url)
        .then(response => response.json())
        .then(response => {
            response.forEach(r => {
                isPatchMaintenance(r) ? maintenancePatchData.push(r) : maintenanceData.push(r);
            })
        })
}

function isPatchMaintenance(maintenance) {
    return maintenance.isPatch;
}

function daRealMath(maintData, isPatch) {
    let maintTimes = [];
    maintData.forEach(m => {
        maintTimes.push(mathWithTimeIReallyHate(m.startTime, m.endTime))
    });
    const index = Math.floor(maintTimes.length / 2);
    const averageTime = maintTimes.sort((a, b) => a - b)[index];
    mainMessage.innerHTML = `
    <p>Well, how could I know??</p>
    <p>But studying the last ${maintTimes.length} ${isPatch? 'patch maintenances' : 'maintenances'}, the ETA is ${getHoursAndMinutesFormat(averageTime)} hours! Enjoy the waiting</p>
    `;
}

function getHoursAndMinutesFormat(decimal) {
    const decimalTimeString = decimal.toString();
    const n = new Date(0, 0);
    n.setMinutes(+decimalTimeString * 60);
    const result = n.toTimeString().slice(0, 5);
    return result;
}

function mathWithTimeIReallyHate(startTime, endTime) {
    const startTimeHour = parseInt(startTime.split(':')[0]);
    const startTimeMinute = parseInt(startTime.split(':')[1]);
    const endTimeHour = parseInt(endTime.split(':')[0]);
    const endTimeMinute = parseInt(endTime.split(':')[1]);

    const maintenanceStart = new Date().setHours(startTimeHour, startTimeMinute);
    const maintenanceEnd = new Date().setHours(endTimeHour, endTimeMinute);
    return (maintenanceEnd - maintenanceStart) / 1000 / 60 / 60;
}

getMessages();
daButton.addEventListener('click', () => daRealMath(maintenanceData, false))
daPatchButton.addEventListener('click', () => daRealMath(maintenancePatchData, true))