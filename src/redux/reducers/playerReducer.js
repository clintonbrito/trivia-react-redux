import { ADD_POINTS, SAVE_URL, SET_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imageURL: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
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
    case ADD_ASSERTIONS:
      return {
        ...state,
        assertions: action.payload,
      };
  case ADD_POINTS:
    return {
      ...state,
      score: state.score + action.points,
    };
  default:
    return state;
  }
};

export default playerReducer;
