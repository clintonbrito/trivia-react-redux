export const ADD_TOKEN = 'ADD_TOKEN';
export const SET_USER = 'SET_USER';

export const addToken = (token) => ({
  type: ADD_TOKEN,
  token,
});

export const setUser = (name, email) => ({
  type: SET_USER,
  name,
  gravatarEmail: email,
});

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
