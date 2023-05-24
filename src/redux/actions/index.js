import md5 from 'crypto-js/md5';

// ACTIONS TYPES
export const SAVE_URL = 'SAVE_URL';
export const SET_USER = 'SET_USER';
export const ADD_POINTS = 'ADD_POINTS';
export const SET_TIME = 'SET_TIME';

export const saveURL = (imageURL) => ({
  type: SAVE_URL,
  payload: imageURL,
});

const setUser = (name, email) => ({
  type: SET_USER,
  name,
  gravatarEmail: email,
});

export const addPoints = (points) => ({
  type: ADD_POINTS,
  points,
});

export const urlGravatar = (email) => async (dispatch) => {
  const hashGravatar = md5(email).toString();
  const imageURL = `https://www.gravatar.com/avatar/${hashGravatar}`;
  return dispatch(saveURL(imageURL));
};

export function addUser(name, email) {
  return async (dispatch) => {
    dispatch(setUser(name, email));
  };
}

export const setTime = (seconds) => ({
  type: SET_TIME,
  seconds,
});
