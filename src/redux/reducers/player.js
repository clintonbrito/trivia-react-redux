import { ADD_POINTS, SAVE_URL, SET_USER, SET_TIME } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imageURL: '',
  seconds: 30,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_URL:
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
  case ADD_POINTS:
    return {
      ...state,
      score: state.score + action.points,
    };
  case SET_TIME:
    return {
      ...state,
      seconds: action.seconds,
    };
  default:
    return state;
  }
};

export default player;
