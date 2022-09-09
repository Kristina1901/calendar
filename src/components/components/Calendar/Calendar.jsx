import useCalendar from '../../hooks/useCalendar';
import moment from 'moment';
import s from './Calendar.module.css';
import Modal from '../Modal/Modal';
import DatePicker from '../Datepicker/Datepicker';
import { useState, useEffect, useRef } from 'react';
const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();
   const refContainer = useRef(calendarRows);
  const [open, setOpen] = useState(false);
  const [array, setArray] = useState(refContainer.current);
  const [dropdown, setdropdown] = useState(false);
  const [some, setSome] = useState(false);
  const [fieldTitle, setFieltitle] = useState('');
  const [fieldMessage, setFielddMessage] = useState('');
  const [fieldDay, setFielddDay] = useState('');
  const [fieldTime, setFielddTime] = useState('');

  useEffect(() => {
    const today = new Date();
    if (
      JSON.stringify(array) === JSON.stringify(refContainer.current) &&
      localStorage.getItem(today.getMonth()) === null
    ) {
      setArray(calendarRows)
      return;
    }
     if (
      localStorage.getItem(today.getMonth()) !== JSON.stringify(array) &&
      selectedDate.getMonth() === today.getMonth()
    ) {
      setArray(JSON.parse(localStorage.getItem(today.getMonth())));
      
    }
    if (JSON.stringify(refContainer.current) !== JSON.stringify(calendarRows)
     &&
      selectedDate.getMonth() !== today.getMonth()
    ) {
      let k = JSON.parse(
        localStorage.getItem(selectedDate.getMonth().toString())
      );
      if (k === null) {
        setArray(calendarRows);
        
      } else {
        setArray(k);
        
      }
    }
    if (JSON.stringify(refContainer.current) === JSON.stringify(calendarRows)) {
      setArray(refContainer.current)
    }
    
   
    
  }, [selectedDate]);
  const findKey = (key, title, month, message, tictac) => {
    let el = Object.values(calendarRows)
      .flat()
      .find(item => item.date === key);
    setArray(prev => {
      const newState = Object.values(prev).map(el => cheaking(el));
      function cheaking(item) {
        let array = item.map(function (num) {
          if (num.date === el.date) {
            return (num = {
              ...num,
              text: title,
              info: message,
              hours: tictac,
            });
          } else {
            return (num = {
              ...num,
            });
          }
        });

        return array;
      }

      let k = { ...newState };
      localStorage.setItem(`${month}`, JSON.stringify(k));
      return { ...newState };
    });
  };

  function closeModal() {
    setSome(false);
    setOpen(!open);
  }
  function getFormField(item) {
    if (item.text !== undefined && item.text !== '') {
      closeModal();
      setSome(true);
      setFieltitle(item.text);
      setFielddMessage(item.info);
      setFielddDay(item.date);
      setFielddTime(item.hours);
    } else {
      return;
    }
  }
  return (
    <div className={s.container}>
      <div className={s.month}>
        <div>
          <button className={s.event} onClick={closeModal}></button>
        </div>
        <div className={s.wrapperButton}>
          <button className={s.prev} onClick={getPrevMonth}></button>
          <p className={s.currentDate}>{`${moment(array[1][0].date).format('MMMM  YYYY')}`}</p>
          <button className={s.next} onClick={getNextMonth}></button>
          <button
            className={s.pick}
            onClick={() =>setdropdown(true)}
           ></button>
          {dropdown && <DatePicker setArray={setArray} setdropdown={setdropdown}/>}
        </div>
      </div>
      <table className={s.table}>
        <tbody>
          {Object.values(array).map(cols => {
            return (
              <tr key={cols[0].date}>
                {cols.map(col =>
                  col.date === todayFormatted ? (
                    <td
                      key={todayFormatted}
                      className={s.today}
                      onClick={() => getFormField(col)}
                    >
                      <div className={s.info}>
                        <p className={s.dateNumber}>{col.value}</p>
                        {col.value && (
                          <p className={s.day}>
                            {moment(new Date(col.date)).format('dd')}
                          </p>
                        )}
                      </div>
                      {col.text && <p className={s.notice}>{col.text}</p>}
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={s.cell}
                      onClick={() => getFormField(col)}
                    >
                      <div className={s.info}>
                        <p className={s.dateNumber}>{col.value}</p>
                        {col.value && (
                          <p className={s.day}>
                            {moment(new Date(col.date)).format('dd')}
                          </p>
                        )}
                      </div>
                      {col.text && <p className={s.notice}>{col.text}</p>}
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        trigger={open}
        onClose={closeModal}
        findKey={findKey}
        some={some}
        fieldTitle={fieldTitle}
        fieldMessage={fieldMessage}
        fieldDay={fieldDay}
        fieldTime={fieldTime}
      />
    </div>
  );
};
export default Calendar;