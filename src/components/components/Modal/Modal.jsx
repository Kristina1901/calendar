import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Form from '../Form/Form';
import s from './Modal.module.css';
const customStyles = {
  width: '300px',
  padding: '20px',
  height: '80%',
  background: '#F8F8F7',
  borderRadius: '20px',
  left: '0',
  rigth: '0',
  bottom: '90px',
  top: '90px',
  position: 'absolute',
};

function Modal({ trigger, onClose, findKey, getUpdate }) {
  return (
    <div>
      <Rodal
        onClose={() => false}
        visible={trigger}
        className={s.rodalMask}
        customStyles={customStyles}
      >
      <div className={s.button} onClick={onClose}></div>
      <Form findKey={findKey} getUpdate={getUpdate}/>
      </Rodal>
    </div>
  );
}

export default Modal;