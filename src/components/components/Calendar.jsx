import useCalendar from 'components/hooks/useCalendar';
import moment from 'moment';
import s from './Calendar.module.css';
const Calendar = () => {
  const {
    calendarRows,
    selectedDate,
    todayFormatted,
    monthNames,
    getNextMonth,
    getPrevMonth,
  } = useCalendar();
  const dateClickHandler = day => {
    console.log(day);
    console.log(todayFormatted);
    console.log(day.split(/\s+/).join('') === todayFormatted.split(/\s+/).join(''))
  };
  return (
    <div className={s.container}>
      <div className={s.month}>
        <div className={s.wrapperButton}>
        <button className={s.prev} onClick={getPrevMonth}>
        </button>
        <p>{`${
          monthNames[selectedDate.getMonth()]
        } ${selectedDate.getFullYear()}`}</p>
        <button className={s.next} onClick={getNextMonth}>
        </button>
        </div>
        <button className={s.pick}></button>
      </div>
      <table className={s.table}>
        <tbody>
          {Object.values(calendarRows).map(cols => {
            return (
              <tr key={cols[0].date}>
                {cols.map(col =>
                  col.date.split(/\s+/).join('') === todayFormatted.split(/\s+/).join('') ? (
                    <td
                      key={col.date}
                      className={
                        s.today              
                      }
                      onClick={() => dateClickHandler(col.date)}
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                        {col.value && (
                          <p>
                            {moment(
                              new Date(col.date.split(/\s+/).join(''))
                            ).format('dd')}
                          </p>
                        )}
                      </div>
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={
                        s.cell 
                     }
                      onClick={() => dateClickHandler(col.date)}
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                        {col.value && (
                          <p>
                            {moment(
                              new Date(col.date.split(/\s+/).join(''))
                            ).format('dd')}
                          </p>
                        )}
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
export default Calendar;
