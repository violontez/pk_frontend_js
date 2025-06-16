import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { pcAddAll } from './actions';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToDoList     from './ToDoList';
import ToDoTaskAdd  from './ToDoTaskAdd';

function App({ dispatch }) {
  useEffect(() => {
    fetch('/task')
      .then(res => res.json())
      .then(data => {
        // из Mongo получаем поле _id, превратим его в id
        const pcs = data.map(d => ({
          id: d._id,
          cpu:     d.cpu,
          gpu:     d.gpu,
          cooling: d.cooling,
          ports:   d.ports,
          ram:     d.ram,
          disks:   d.disks
        }));
        dispatch(pcAddAll(pcs));
      })
      .catch(err => console.error('Ошибка загрузки:', err));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDoList />} />
        <Route path="/add" element={<ToDoTaskAdd />} />
      </Routes>
    </Router>
  );
}

export default connect()(App);