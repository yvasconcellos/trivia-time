import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken, resetGame } from '../redux/actions';
import triviatime from '../images/triviatime.png'
import bggame from '../images/bggame.png'

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabledButton: true,
  }

  componentDidMount() {
    const { resetState } = this.props;
    resetState();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.ableBtn);
  }

  ableBtn = () => {
    const { name, email } = this.state;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (name !== '' && regexEmail.test(email)) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
  }

  handleClick = async () => {
    const { addToken, history } = this.props;
    const { name, email } = this.state;
    await addToken(name, email);
    history.push('/game');
  }

  configPush = () => {
    const { history } = this.props;
    history.push('/configuracao');
  }

  render() {
    const { name, email, disabledButton } = this.state;
    return (
    <div
    className='flex justify-center'
    >
      <div
      className='flex h-screen w-1/2 items-center'
      >
        <img src={bggame}
        className='w-screen'
        />
      </div>
      <form
      className='flex 
      flex-col 
      w-1/2 
      items-center 
      justify-center
      '
      >
      <div
      className='flex flex-col
      bg-violet-900
      rounded-lg
      w-2/3
      p-10
      items-center
      '
      >
        <img src={triviatime} 
        />
        <label htmlFor="name"
        >
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
            placeholder='Username'
            className='my-2
            bg-violet-900
            p-1
            border-b
            border-slate-600
            text-white
            focus:outline-none
            '
            />
        </label>
        <label htmlFor="email">
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
            placeholder='Email'
            className='my-2
            bg-violet-900
            border-b
            border-slate-600
            p-1
            text-white
            focus:outline-none
            '
            />
        </label>
        <button
          disabled={ disabledButton }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
          className='my-2
          w-1/2
          py-1
          rounded-lg
          disabled:bg-slate-900
          disabled:text-slate-800
          bg-slate-800
          text-white
          '
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          disabled
          onClick={ this.configPush }
          className='my-2
          w-1/2
          py-1
          rounded-lg
          bg-slate-800
          text-white
          '
          >
          Configuração
        </button>
          </div>
      </form>
    </div>
    );
  }
}

Login.propTypes = {
  addToken: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  resetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToken: (value1, value2) => dispatch(fetchToken(value1, value2)),
  resetState: () => dispatch(resetGame()),
});

export default connect(null, mapDispatchToProps)(Login);
