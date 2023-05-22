import { SET_USER } from '../actions';

const INITIAL_STATE = {};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
    };
  default:
    return state;
  }
};

export default playerReducer;
