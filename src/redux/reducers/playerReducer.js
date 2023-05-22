import { SAVE_EMAIL, SET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imageURL: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      imageURL: action.payload,
    };
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
