import moment from 'moment';
import Moment from 'moment';

const FIRST_INTERVAL_TIME = 30;
const LAST_INTERVAL_TIME = 80;
const DATE_FORMAT = 'DD/MM/YYYY';

function createIntervals(start, end) {
    let intervals = [];
    for (let compteur = start; compteur < end; compteur++) {
        intervals.push({key: compteur, text: this.createTimeFromCode(compteur), value: compteur });
    }
    return intervals;
}

function createTimeFromCode(code) {

    const hours = Math.floor(code/4);
    const minutes = (code % 4) * 15;
    
    let ret = ((hours < 10) ? '0': '');
    ret = ret + hours + ':' + ((minutes === 0) ? '00': minutes);
    return ret;
}

function momentToString (date) {
    return Moment(date).format(DATE_FORMAT);
}


function getMoment () {
    return moment();
}

export default {
    FIRST_INTERVAL_TIME,
    LAST_INTERVAL_TIME,
    DATE_FORMAT,
    createIntervals,
    createTimeFromCode,
    momentToString,
    getMoment
}