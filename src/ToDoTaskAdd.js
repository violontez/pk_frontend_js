import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { pcAdd } from './actions';

function ToDoTaskAdd({ dispatch }) {
  const [form, setForm] = useState({
    cpu: '', gpu: '', cooling: '', ports: '', ram: '', disks: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        // MongoDriver сам допишет data._id в объект task, 
        // поэтому здесь переупакуем в наш shape:
        const newPc = {
          id:      data._id,
          cpu:     data.cpu,
          gpu:     data.gpu,
          cooling: data.cooling,
          ports:   data.ports,
          ram:     data.ram,
          disks:   data.disks
        };
        dispatch(pcAdd(newPc));
        navigate('/');
      })
      .catch(err => console.error('Ошибка при добавлении:', err));
  };

  return (
    <div className="container">
      <header className="list-header">
        <h1>Добавить новую сборку</h1>
        <NavLink to="/" className="btn btn-outline-secondary">
          Назад
        </NavLink>
      </header>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Процессор</label>
          <input
            name="cpu"
            value={form.cpu}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Видеокарта</label>
          <input
            name="gpu"
            value={form.gpu}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Охлаждение</label>
          <input
            name="cooling"
            value={form.cooling}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Порты</label>
          <input
            name="ports"
            value={form.ports}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>ОЗУ (ГБ)</label>
          <input
            type="number"
            name="ram"
            value={form.ram}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label>Накопители (ГБ)</label>
          <input
            type="number"
            name="disks"
            value={form.disks}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Сохранить
        </button>
      </form>
    </div>
  );
}

export default connect()(ToDoTaskAdd);
