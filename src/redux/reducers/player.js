import { GET_TOKEN } from '../actions';

const INNITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payload.token.token);
    return { ...state, name: action.payload.name, gravatarEmail: action.payload.email };
  default:
    return state;
  }
};

export default playerReducer;
