import moment from 'moment';
import s from './Calendar.module.css';
import Modal from '../Modal/Modal';
import DatePicker from '../Datepicker/Datepicker';
import { getDate } from '../../hooks/useYear';
import { useState, useEffect, useRef } from 'react';
const Calendar = () => {
  const [dropdown, setdropdown] = useState(false);
  const [some, setSome] = useState(false);
  const [fieldTitle, setFieltitle] = useState('');
  const [fieldMessage, setFielddMessage] = useState('');
  const [fieldDay, setFielddDay] = useState('');
  const [fieldTime, setFielddTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const refContainer = useRef(getDate(selectedDate));
  const [open, setOpen] = useState(false);
  const [array, setArray] = useState(refContainer.current);
  const todayFormatted = `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`
    .split(/\s+/)
    .join('');

  useEffect(() => {
    const today = new Date();
    if (
      JSON.stringify(getDate(selectedDate)) ===
        JSON.stringify(refContainer.current) &&
      localStorage.getItem(moment(new Date(selectedDate)).format('YYYY-MM')) ===
        null
    ) {
      setArray(refContainer.current);

      return;
    }
    if (
      localStorage.getItem(moment(new Date(today)).format('YYYY-MM')) !==
        JSON.stringify(array) &&
      moment(new Date(selectedDate)).format('YYYY-MM') ===
        moment(new Date(today)).format('YYYY-MM')
    ) {
      setArray(
        JSON.parse(
          localStorage.getItem(moment(new Date(selectedDate)).format('YYYY-MM'))
        )
      );
    }
    if (
      JSON.stringify(refContainer.current) !==
        JSON.stringify(getDate(selectedDate)) &&
      selectedDate.getMonth() !== today.getMonth()
    ) {
      let k = JSON.parse(
        localStorage.getItem(moment(new Date(selectedDate)).format('YYYY-MM'))
      );
      if (k === null) {
        setArray(getDate(selectedDate));
      } else {
        setArray(k);
      }
    }
  }, [selectedDate,]);
  const findKey = (key, title, month, message, tictac) => {
    let newFormat = moment(new Date(key)).format('YYYY-M-D');
    if (
      moment(new Date(key)).format('YYYY-MM') ===
      moment(new Date(selectedDate)).format('YYYY-MM')
    ) {
      let el = Object.values(array)
        .flat()
        .find(item => item.date === newFormat);
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

        let storageObj = { ...newState };
        console.log(storageObj);
        localStorage.setItem(`${month}`, JSON.stringify(storageObj));
        return { ...newState };
      });
    }
    if (
      moment(new Date(key)).format('YYYY-MM') !==
      moment(new Date(selectedDate)).format('YYYY-MM')
    ) {
      let obj = Object.values(getDate(new Date(key)))
        .flat()
        .find(item => item.date === newFormat);
      const newState = Object.values(getDate(new Date(key))).map(el =>
        cheaking(el)
      );
      function cheaking(item) {
        let array = item.map(function (num) {
          if (num.date === obj.date) {
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

      let storageObj = { ...newState };
      localStorage.setItem(`${month}`, JSON.stringify(storageObj));
      return { ...newState };
    }
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
  const getPrevMonth = () => {
    setSelectedDate(
      prevValue =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1)
    );
  };
  const getNextMonth = () => {
    setSelectedDate(
      prevValue =>
        new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1)
    );
  };
  return (
    <div className={s.container}>
      <div className={s.month}>
        <div>
          <button className={s.event} onClick={closeModal}></button>
        </div>
        <div className={s.wrapperButton}>
          <button className={s.prev} onClick={getPrevMonth}></button>
          <p className={s.currentDate}>{`${moment(
            new Date(selectedDate)
          ).format('MMMM  YYYY')}`}</p>
          <button className={s.next} onClick={getNextMonth}></button>
          <button className={s.pick} onClick={() => setdropdown(true)}></button>
          {dropdown && (
            <DatePicker
              setArray={setArray}
              setdropdown={setdropdown}
              setSelectedDate={setSelectedDate}
            />
          )}
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
                              {moment(new Date(col.date)).format('dd').toString()}
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
                              {moment(new Date(col.date)).format('dd').toString()}
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
