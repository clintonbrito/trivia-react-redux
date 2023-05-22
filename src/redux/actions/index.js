import md5 from 'crypto-js/md5';

// ACTIONS TYPES
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const ADD_TOKEN = 'ADD_TOKEN';
export const SET_USER = 'SET_USER';

const saveEmail = (imageURL) => ({
  type: SAVE_EMAIL,
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

export const urlGravatar = (email) => (dispatch) => {
  const hashGravatar = md5(email).toString();
  const imageURL = `https://www.gravatar.com/avatar/${hashGravatar}`;
  return dispatch(saveEmail(imageURL));
};

export function addUser(name, email) {
  return async (dispatch) => {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    console.log(data);
    const { token } = data;
    dispatch(addToken(token));
    localStorage.setItem('token', token);
    dispatch(setUser(name, email));
  };
}
