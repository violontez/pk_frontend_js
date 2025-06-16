import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ToDoTask from './ToDoTask';

function ToDoList({ pcs }) {
  return (
    <div className="container">
      <header className="list-header">
        <h1>Каталог ПК-сборок</h1>
        <NavLink to="/add" className="btn btn-primary">
          Добавить сборку
        </NavLink>
      </header>
      <div className="grid">
        {pcs.map(pc => (
          // Передаём явно id, а не Mongo-шное _id
          <ToDoTask key={pc.id} {...pc} />
        ))}
      </div>
    </div>
  );
}

export default connect(state => ({ pcs: state.pcs }))(ToDoList);
