const endpoint = 'https://opentdb.com/api_token.php?command=request';
export const GET_TOKEN = 'GET_TOKEN';

export const getToken = (token, name, email) => ({
  type: GET_TOKEN,
  payload: { token, name, email },
});

export const fetchToken = (name, email) => async (dispatch) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  dispatch(getToken(data, name, email));
};
