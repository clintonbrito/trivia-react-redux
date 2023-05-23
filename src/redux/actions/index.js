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

const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
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

export function addUser(email, name) {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    dispatch(addToken(token));
    localStorage.setItem('token', token);
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
