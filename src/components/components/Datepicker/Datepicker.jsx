import useCalendar from '../../hooks/useCalendar';
import s from './Datepicker.module.css';
let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DatePicker = ({ date, setDate }) => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();

  return (
    <div className={s.container}>
      <div className={s.month}>
        <div className={s.wrapperButton}>
          <button className={s.prev} onClick={getPrevMonth}></button>
          <p>{`${
            monthNames[selectedDate.getMonth()]
          } ${selectedDate.getFullYear()}`}</p>
          <button className={s.next} onClick={getNextMonth}></button>
        </div>
      </div>
      <table className={s.table}>
        <thead>
          <tr>
            {days.map(item => (
              <td key={item}>{item}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendarRows).map(cols => {
            return (
              <tr key={cols[0].date}>
                {cols.map(col =>
                  col.date === todayFormatted ? (
                    <td
                      key={todayFormatted}
                      className={s.cell}
                      onClick={() => setDate(col.date)}
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                      </div>
                      <p>{col.text}</p>
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={s.cell}
                      onClick={() => setDate(col.date)}
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                      </div>
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default DatePicker;
