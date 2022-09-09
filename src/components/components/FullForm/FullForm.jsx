import { useState } from 'react';
import moment from 'moment';
import s from './FullForm.module.css';
export default function FullForm({
  fieldTitle,
  fieldMessage,
  fieldDay,
  fieldTime,
  findKey,
  onClose,
}) {
  const [title, setTitle] = useState(fieldTitle);
  const [message, setMessage] = useState(fieldMessage);
  const [date, setDate] = useState(fieldDay);
  const [time, setTime] = useState(fieldTime);
  const handleTitleChange = event => {
    setTitle(event.target.value);
  };
  const handleMessageChange = event => {
    setMessage(event.target.value);
  };
  const handleDateChange = event => {
    setDate(event.target.value);
  };
  const handleTimeChange = event => {
    setTime(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
    let query = moment(new Date(date)).format('YYYY-M-D');
    let mon = moment(new Date(date)).format('YYYY-MM');
   findKey(query, title, mon, message, time);
    onClose(() => false);
  };
  const handleDelet = () => {
    setTitle('');
    setMessage('');
    setTime('');
    let query = moment(new Date(date)).format('YYYY-M-D');
    let mon = moment(new Date(date)).format('YYYY-MM');
    findKey(query, '', mon, '', '');
  };

  return (
    <div className={s.container}>
      <p>Edit idea item</p>
      <span className={s.date}>{`Created at ${moment(new Date(date)).format(
        'DD.MM.YYYY'
      )} ${time}`}</span>
      <form className={s.form}>
        <label className={s.tooltip}>
          Title*
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
          <label className={s.tooltip}>
            Date
            <input
              className={s.inputDate}
              type="text"
              autoComplete="off"
              autoFocus
              value={moment(new Date(date)).format('DD.MM.YYYY')}
              onChange={handleDateChange}
              name="date"
              required
            />
          </label>
          <label className={s.tooltip}>
            Time
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
        <button
          type="submit"
          className={s.button}
          onClick={e => handleSubmit(e)}
        >
          Save
        </button>
        <button
          type="button"
          className={s.delete}
          onClick={() => handleDelet()}
        >
          Delete
        </button>
      </form>
    </div>
  );
}
