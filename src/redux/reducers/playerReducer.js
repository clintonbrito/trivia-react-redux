import { SAVE_EMAIL } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
