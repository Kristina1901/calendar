import useCalendar from '../../hooks/useCalendar';
import moment from 'moment';
import s from './Calendar.module.css';
import Modal from '../Modal/Modal';
import { useState, useEffect, useRef} from 'react';
const Calendar = () => {
  const {
    today,
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
    // const [copy, setCopy] = useState(calendarRows);
     useEffect(() => {
       if(localStorage.getItem(today.getMonth()) !== JSON.stringify(array) && selectedDate.getMonth()=== today.getMonth()) {
        setArray(JSON.parse(localStorage.getItem(today.getMonth())))
        console.log(JSON.parse(localStorage.getItem(today.getMonth())))
      }
       if(JSON.stringify(array) !== JSON.stringify(calendarRows) && selectedDate.getMonth()!== today.getMonth()) {
        for (let i = 0; i < localStorage.length; i++)
          if(localStorage.key(i) === selectedDate.getMonth().toString()){
            setArray(JSON.parse(localStorage.getItem(selectedDate.getMonth().toString())))
            
           break
           
          
          }
          else {
            setArray(calendarRows)
          }
      }
                
       
      
      // if(JSON.stringify(array) !== JSON.stringify(refContainer.current) && selectedDate.getMonth()=== today.getMonth()) {
      //   localStorage.setItem(`${today.getMonth()}`, JSON.stringify(array))
      //    console.log('hhhh')
      
        
              
       
      // }
      // if(selectedDate.getMonth()=== today.getMonth() && JSON.stringify(copy) !== JSON.stringify(refContainer)) {
      //    setArray(copy)
      //    console.log('y')
      // }
    //   if(JSON.stringify(array) !== JSON.stringify(refContainer.current)&& selectedDate.getMonth()=== today.getMonth()) {
    //    setArray(refContainer.current)
    //    console.log('lkji')
    //  }
     
      


    },[calendarRows,today,selectedDate, array]);
  const findKey = (key, title, time) => {
  let el = Object.values(calendarRows).flat().find(item =>(item.date === key))
  // localStorage.setItem(`${time}`, JSON.stringify(add()))
  // console.log(add())
  setArray(prev => {
    const newState = Object.values(prev).map(el => cheaking(el))
    function cheaking(item) {
       let array = item.map(function(num){
      
       if (num.date === el.date) {
        return num = {
            ...num,        
           text: title}
    }
    else {
      return num = {
        ...num        
      }

    }
     })
     
    return array
    
   
    
} 

let k = {...newState}
localStorage.setItem(`${time}`, JSON.stringify(k))
return {...newState}      
 
  
})
}

  function closeModal() {
    setOpen(!open);
   
  }
  function g() {
    getNextMonth()
   
   
  }
  function f() {
    getPrevMonth()
    
   
  }
   return (
    <div className={s.container}>
      <div className={s.month}>
        <div>
        <button className={s.event} onClick={closeModal}></button>
        </div>
        <div className={s.wrapperButton}>
        <button className={s.prev} onClick={f}>
        </button>
        <p>{`${
         monthNames[selectedDate.getMonth()]
        } ${selectedDate.getFullYear()}`}</p>
        <button className={s.next} onClick={g}>
        </button>
        <button className={s.pick}></button>
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
                      className={
                        s.today              
                      }
                     
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                        {col.value && (
                          <p>
                            {moment(
                              new Date(col.date)
                            ).format('dd')}
                           
                          </p>
                        )}
                      </div>
                      <p >{col.text}</p>
                    </td>
                  ) : (
                    <td
                      key={col.date}
                      className={
                        s.cell 
                     }
                     
                    >
                      <div className={s.info}>
                        <p>{col.value}</p>
                        {col.value && (
                          <p>
                            {moment(
                              new Date(col.date)
                            ).format('dd')}
                          </p>
                        )}
                      </div>
                       <p className={s.notice}>{col.text}</p>
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal trigger={open} onClose={closeModal} findKey={findKey}/>
    </div>
  );
};
export default Calendar;
