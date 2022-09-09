import s from './Datepicker.module.css';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import moment from 'moment';
const monthName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DatePicker = ({ date, setDate }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(null);
  useEffect(() => {
    if (month === null && year !== today.getFullYear()) {
      return;
    }
    if (month !== null) {
      let time = `${month}${year}`;
      let formattedYear = moment(new Date(time)).format('YYYY');
      let formattedMonts = moment(new Date(time)).format('MM');
      getMonts(formattedYear, formattedMonts);
    }
  }, [month]);
  const getPrevMonth = () => {
    setYear(prev => prev - 1);
  };
  const getNextMonth = () => {
    setYear(prev => prev + 1);
  };
  function getTable() {
    let arr = monthName.slice(0, 3);
    let another = monthName.slice(3, 6);
    let next = monthName.slice(6, 9);
    let last = monthName.slice(9, 12);
    let main = [arr, another, next, last];
    return main;
  }
  function getMonts(y, m) {
    var monthIndex = m - 1;
    var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var date = new Date(year, monthIndex, 1);
    var result = [];
    while (date.getMonth() === monthIndex) {
      result.push(date.getDate() + '-' + names[date.getDay()]);
      date.setDate(date.getDate() + 1);
    }
    return result;
  }
  return (
    <div className={s.container}>
      <div className={s.month}>
        <div className={s.wrapperButton}>
          <button
            className={s.prev}
            onClick={() => {
              getPrevMonth();
            }}
          ></button>
          <p>{year}</p>
          <button
            className={s.next}
            onClick={() => {
              getNextMonth();
            }}
          ></button>
        </div>
      </div>
      <table className={s.table}>
        <tbody>
          {getTable().map(item => {
            return (
              <tr key={nanoid()}>
                {item.map((item, index) => (
                  <td key={index} onClick={() => setMonth(item)}>
                    {item}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default DatePicker;
