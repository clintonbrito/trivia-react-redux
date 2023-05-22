import { ADD_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
