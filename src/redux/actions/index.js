import md5 from 'crypto-js/md5';

// ACTIONS TYPES
export const SAVE_URL = 'SAVE_URL';
export const ADD_TOKEN = 'ADD_TOKEN';
export const SET_USER = 'SET_USER';
export const DELETE_TOKEN = 'DELETE_TOKEN';

export const saveURL = (imageURL) => ({
  type: SAVE_URL,
  payload: imageURL,
});

const setUser = (name, email) => ({
  type: SET_USER,
  name,
  gravatarEmail: email,
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

const deleteToken = () => ({
  type: DELETE_TOKEN,
});

export function removeUser() {
  return (dispatch) => {
    dispatch(deleteToken());
    localStorage.setItem('token', '');
  };
}
