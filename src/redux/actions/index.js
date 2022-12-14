const endpoint = 'https://opentdb.com/api_token.php?command=request';
export const GET_TOKEN = 'GET_TOKEN';
export const SEND_SCORE = 'SEND_SCORE';
export const RESET_GAME = 'RESET_GAME';

export const getToken = (token, name, email) => ({
  type: GET_TOKEN,
  payload: { token, name, email },
});

export const fetchToken = (name, email) => async (dispatch) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  dispatch(getToken(data, name, email));
};

export const sendScore = (score, assertions) => ({
  type: SEND_SCORE,
  payload: { score, assertions },
});

export const resetGame = () => ({
  type: RESET_GAME,
});
