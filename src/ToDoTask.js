import React, { useState } from 'react';
import { connect } from 'react-redux';
import { pcDelete, pcUpdate } from './actions';

function ToDoTask({ id, cpu, gpu, cooling, ports, ram, disks, dispatch }) {
  const [editing, setEditing] = useState(false);
  const [editCpu, setEditCpu] = useState(cpu);
  const [editGpu, setEditGpu] = useState(gpu);

  // Удаление
  const handleDelete = () => {
    if (!window.confirm('Удалить эту сборку?')) return;
    fetch(`/task/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) dispatch(pcDelete(id));
        else console.error('Ошибка удаления:', res.statusText);
      })
      .catch(err => console.error('Ошибка сети при удалении:', err));
  };

  // Сохранить правки
  const handleSave = () => {
    fetch(`/task/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cpu: editCpu, gpu: editGpu })
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        // обновляем локально
        dispatch(pcUpdate({
          id,
          cpu:     editCpu,
          gpu:     editGpu,
          cooling,
          ports,
          ram,
          disks
        }));
        setEditing(false);
      })
      .catch(err => console.error('Ошибка обновления:', err));
  };

  // Разметка в режиме редактирования
  if (editing) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label>Процессор</label>
            <input
              type="text"
              value={editCpu}
              onChange={e => setEditCpu(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Видеокарта</label>
            <input
              type="text"
              value={editGpu}
              onChange={e => setEditGpu(e.target.value)}
            />
          </div>
          <button
            className="btn btn-submit"
            onClick={handleSave}
          >
            Сохранить
          </button>
          <button
            className="btn btn-outline-secondary"
            style={{ marginLeft: 8 }}
            onClick={() => setEditing(false)}
          >
            Отмена
          </button>
        </div>
      </div>
    );
  }

  // Обычная карточка
  return (
    <div className="card">
      <div className="card-header">
        <h2>{cpu}</h2>
        <h4>{gpu}</h4>
      </div>
      <div className="card-body">
        <ul className="card-list">
          <li><strong>Охлаждение:</strong> {cooling}</li>
          <li><strong>Порты:</strong> {ports}</li>
          <li><strong>ОЗУ:</strong> {ram} ГБ</li>
          <li><strong>Накопители:</strong> {disks} ГБ</li>
        </ul>
        <div>
          <button
            className="btn btn-outline-secondary"
            onClick={() => setEditing(true)}
          >
            Редактировать
          </button>
          <button
            className="btn btn-danger"
            style={{ marginLeft: 8 }}
            onClick={handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect()(ToDoTask);
