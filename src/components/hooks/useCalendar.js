import { useState } from 'react';
 const monthArray =['January', 'February', 'March', 'April', 
 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']  
function useCalendar(monthNames=monthArray) {
    const today = new Date();
    const todayFormatted = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`.split(/\s+/).join('')
    const daysInWeek = [1,2,3,4,5,6,0]
    const [selectedDate, setSelectedDate] = useState(today)
    const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth()+ 1, 0)
    const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0) 
    const daysInMonth = selectedMonthLastDate.getDate()
    const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay()
    const startingPoint = daysInWeek.indexOf(firstDayInMonth) + 1;
    let prevMonthStartingPoint = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth)+1;
    let currentMonthCounter = 1;
    let nextMonthCounter = 1;
    const rows = 6;
    const cols = 8;
    const calendarRows = {} 
    for (let i = 1; i< rows; i++) {
        for(let j=1; j< cols; j++) {
          if(!calendarRows[i]) {
            calendarRows[i] = [];
          }
          if(i===1) {
            if(j < startingPoint) {
                calendarRows[i] =[...calendarRows[i], {
                    classes: 'in-prev-month',
                    date: `${selectedDate.getMonth() === 0? selectedDate.getFullYear() - 1: selectedDate.getFullYear()}
                    -${selectedDate.getMonth()===0? 12: selectedDate.getMonth()}-${prevMonthStartingPoint}`.split(/\s+/).join(''),
                    value: prevMonthStartingPoint,
                    text:''
                                 
                }]
                prevMonthStartingPoint++;
            } else {
                calendarRows[i] =[...calendarRows[i], {
                    classes: '',
                    date: `${selectedDate.getFullYear()}-${selectedMonthLastDate.getMonth() + 1}-${currentMonthCounter}`.split(/\s+/).join(''),
                    value: currentMonthCounter,
                    text:''
                                        
                }]
                currentMonthCounter++
            }  
          }  else if(i > 1 && currentMonthCounter < daysInMonth + 1) {
            calendarRows[i] =[...calendarRows[i], {
                classes: '',
                date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${currentMonthCounter}`.split(/\s+/).join(''),
                value: currentMonthCounter,
                text:''
            }];
            currentMonthCounter++
        }else{
            calendarRows[i] =[...calendarRows[i], {
                classes: 'in-next-month',
                date: `${selectedDate.getMonth()+2 === 13 ? selectedDate.getFullYear()+ 1 : selectedDate.getFullYear()}-${selectedDate.getMonth()+ 2 ===13? 1 : selectedDate.getMonth() + 2}-${nextMonthCounter}`.split(/\s+/).join('')
            }];
            nextMonthCounter++;
        }
        }
    }
    const getPrevMonth = () => {
        setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth()-1, 1))
    }
    const getNextMonth =() => {
       setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1))
       
    }
    return {
        today,
        monthNames,
        todayFormatted,
        calendarRows, 
        selectedDate,
        getPrevMonth,
        getNextMonth
    }

  }
  export default useCalendar