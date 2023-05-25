import { ADD_POINTS, SAVE_URL, SET_USER,
  SET_TIME, ADD_ASSERTION, ADD_TO_RANKING, CLEAR_ASSERTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imageURL: '',
  seconds: 30,
  ranking: [],
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
  case ADD_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case ADD_TO_RANKING:
    return {
      ...state,
      ranking: [
        ...state.ranking,
        {
          ...state,
        },
      ],
    };
  case CLEAR_ASSERTION:
    return {
      ...state,
      assertions: 0,
    };
  default:
    return state;
  }
};

export default player;
