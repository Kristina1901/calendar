import { useState } from 'react';
import moment from 'moment';
import s from './Form.module.css';
export default function Form({findKey}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
    const handleTitleChange = event => {
      setTitle(event.target.value);
    };
    const handleMessageChange = event => {
      setMessage(event.target.value);
    };
    const handleDateChange = event => {
      setDate(event.target.value)
      
    };
    const handleTimeChange = event => {
      setTime(event.target.value)
    };
    const handleSubmit = event => {
      event.preventDefault();
      // let { title, text, date, time } = event.target.elements;
      let query = moment(new Date(date)).format("YYYY-M-D")
      let mon = new Date(date);
      let dtm = mon.getMonth();
      findKey(query, title, dtm)
      
      
    };
  
    return (
      <div className={s.container}>
        <p>Add new idea item</p>
        <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.tooltip}>Title*
         <input
            className={s.inputTitle}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Title goes here"
            name="title"
            onChange={handleTitleChange}
            value={title}
            required
          />
          </label>
           <span className={s.tooltip}>Decription</span>
          <textarea
            className={s.inputDecription}
            type="text"
            autoComplete="off"
            name="text"
            autoFocus
            value={message}
            onChange={handleMessageChange}
          />
         <div className={s.timeContainer}>
         <label className={s.tooltip}>Date
           <input
            className={s.inputDate}
            type="date"
            autoComplete="off"
            autoFocus
            value={date}
            onChange={handleDateChange}
            name="date"
            required
          />
          </label>
          <label className={s.tooltip}>Time
          <input
            className={s.inputTime}
            type="text"
            autoComplete="off"
            autoFocus
            name="time"
            value={time}
            onChange={handleTimeChange}
            required
          />
          </label>
          </div>
         
           <button type="submit" className={s.button}>
           Save
           </button>
        </form>
      </div>
    );
  }