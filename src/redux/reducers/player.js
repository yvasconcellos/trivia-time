import { GET_TOKEN, SEND_SCORE } from '../actions';

const INNITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payload.token.token);
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  case SEND_SCORE:
    return {
      ...state,
      score: action.payload.score,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default player;
