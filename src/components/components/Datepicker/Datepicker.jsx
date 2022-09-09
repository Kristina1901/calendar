import s from './Datepicker.module.css';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import {getDate} from '../../hooks/useYear';
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
const DatePicker = ({ setdropdown, setArray, setSelectedDate }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(null);
  useEffect(() => {
    if (month === null && year !== today.getFullYear()) {
      return;
    }
    if (month !== null) {
      let time = `${month}${year}`;
      const correctTime = new Date(time)
      setdropdown(false)
      setSelectedDate(correctTime)
      setArray(getDate(correctTime))
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
                  <td key={index} onClick={() => (setMonth(item))}>
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
