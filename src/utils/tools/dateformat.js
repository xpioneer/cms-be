import Moment from 'moment'

const DateTimeF = d => {
  return d !== undefined && Moment(d).isValid() ? Moment(d).format('YYYY-MM-DD HH:mm:ss') : null;
}

const DateF = d => {
  return d !== undefined && Moment(d).isValid() ? Moment(d).format('YYYY-MM-DD') : null;
}

const TimeF = d => {
  return d !== undefined && Moment(d).isValid() ? Moment(d).format('HH:mm:ss') : null;
}

const TodayRange = () =>{
  let s = Moment().format('YYYY-MM-DD 00:00:00');
  let e = Moment().add(1, 'd').format('YYYY-MM-DD 00:00:00');
  return [s, e]//['2017-05-02 00:00:00', '2017-05-03 00:00:00']
}

export default {
  DateTimeF,
  DateF,
  TimeF,
  TodayRange
}