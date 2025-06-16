// src/ToDoTaskAdd.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { pcAdd } from './actions';

function ToDoTaskAdd({ dispatch, pcs }) {
  const navigate = useNavigate();

  // Вычисляем уникальные списки CPU и GPU из уже существующих
  const cpuOptions = Array.from(new Set(pcs.map(pc => pc.cpu)));
  const gpuOptions = Array.from(new Set(pcs.map(pc => pc.gpu)));

  // Форма
  const [form, setForm] = useState({
    cpu:     '',
    gpu:     '',
    cooling: '',
    ports:   '',
    ram:     '',
    disks:   ''
  });
  // Выбранный пункт в select, и флаги «новый элемент»
  const [selectedCpu, setSelectedCpu] = useState('');
  const [isNewCpu, setIsNewCpu]       = useState(false);
  const [selectedGpu, setSelectedGpu] = useState('');
  const [isNewGpu, setIsNewGpu]       = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Берём либо новый, либо выбранный элемент
    const cpuValue = isNewCpu ? form.cpu : selectedCpu;
    const gpuValue = isNewGpu ? form.gpu : selectedGpu;

    // Простая валидация
    if (!cpuValue || !gpuValue) {
      return alert('Укажите процессор и видеокарту');
    }

    const payload = {
      cpu:     cpuValue,
      gpu:     gpuValue,
      cooling: form.cooling,
      ports:   form.ports,
      ram:     form.ram,
      disks:   form.disks
    };

    fetch('/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        // Преобразуем _id → id
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
        {/* CPU: select или новый */}
        <div className="form-group">
          <label>Процессор</label>
          <select
            value={selectedCpu}
            onChange={e => {
              const v = e.target.value;
              setSelectedCpu(v);
              if (v === '__new__') {
                setIsNewCpu(true);
                setForm(f => ({ ...f, cpu: '' }));
              } else {
                setIsNewCpu(false);
                setForm(f => ({ ...f, cpu: v }));
              }
            }}
          >
            <option value="">— выберите —</option>
            {cpuOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="__new__">+ добавить новый процессор</option>
          </select>
          {isNewCpu && (
            <input
              type="text"
              name="cpu"
              value={form.cpu}
              onChange={handleChange}
              placeholder="Название процессора"
              required
            />
          )}
        </div>

        {/* GPU: select или новый */}
        <div className="form-group">
          <label>Видеокарта</label>
          <select
            value={selectedGpu}
            onChange={e => {
              const v = e.target.value;
              setSelectedGpu(v);
              if (v === '__new__') {
                setIsNewGpu(true);
                setForm(f => ({ ...f, gpu: '' }));
              } else {
                setIsNewGpu(false);
                setForm(f => ({ ...f, gpu: v }));
              }
            }}
          >
            <option value="">— выберите —</option>
            {gpuOptions.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
            <option value="__new__">+ добавить новую видеокарту</option>
          </select>
          {isNewGpu && (
            <input
              type="text"
              name="gpu"
              value={form.gpu}
              onChange={handleChange}
              placeholder="Название видеокарты"
              required
            />
          )}
        </div>

        {/* Остальные поля остаются без изменений */}
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

const mapStateToProps = state => ({
  pcs: state.pcs
});

export default connect(mapStateToProps)(ToDoTaskAdd);
