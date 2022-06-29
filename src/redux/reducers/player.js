import { GET_TOKEN, SEND_SCORE } from '../actions';

const INNITIAL_STATE = {
  name: '',
  assertions: '',
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
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
