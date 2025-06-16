import { combineReducers } from 'redux';
import { PC_ADD_ALL, PC_ADD, PC_DELETE, PC_UPDATE } from './actions';

function pcs(state = [], action) {
  switch (action.type) {
    case PC_ADD_ALL:
      return action.payload;
    case PC_ADD:
      return [...state, action.payload];
    case PC_DELETE:
      return state.filter(pc => pc.id !== action.payload);
    case PC_UPDATE:
      return state.map(pc =>
        pc.id === action.payload.id ? action.payload : pc
      );
    default:
      return state;
  }
}

export default combineReducers({ pcs });
