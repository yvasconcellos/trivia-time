import { GET_TOKEN } from '../actions';

const INNITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const playerReducer = (state = INNITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    localStorage.setItem('token', action.payload.token);
    return state;
  
  default:
    return state;
  }
};

export default playerReducer;
