import { combineReducers } from 'redux';
import player from './player';
import tokenReducer from './tokenReducer';

const rootReducer = combineReducers({ player, tokenReducer });

export default rootReducer;
