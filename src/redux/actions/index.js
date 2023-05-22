import md5 from 'crypto-js/md5';

// ACTIONS TYPES
export const SAVE_EMAIL = 'SAVE_EMAIL';

const saveEmail = (imageURL) => ({
  type: SAVE_EMAIL,
  payload: imageURL,
});

export const urlGravatar = (email) => (dispatch) => {
  const hashGravatar = md5(email).toString();
  const imageURL = `https://www.gravatar.com/avatar/${hashGravatar}`;
  return dispatch(saveEmail(imageURL));
};
