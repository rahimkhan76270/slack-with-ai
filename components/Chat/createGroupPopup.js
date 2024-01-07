// PopupForm.js
import React, { useState } from 'react';

const CreateGroupPopupForm = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if(name!="" && email!=""){
    onSubmit(name, email);
    setName("");
    setEmail("");
    onClose();
  }
  };
  return (
    <div className={`popup ${isOpen ? 'open' : ''}`}>
      <div className="popup-content">
        <span className="close" onClick={onClose}>&times;</span>
        <button className="close-btn text-red-600" onClick={onClose}>X</button>
        <h2 style={{ marginBottom: '20px' }}>Add Name and Email</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white"
              required
            />
          </div>
          <button style={{ marginTop: '10px' }} onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline my-2">Submit</button>
      </div>
    </div>
  );

};

export default CreateGroupPopupForm;
