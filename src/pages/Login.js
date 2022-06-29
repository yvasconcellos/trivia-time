import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchToken } from '../redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabledButton: true,
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value }, this.ableBtn);
  }

  ableBtn = () => {
    const { name, email } = this.state;
    if (name !== '' && email !== '') {
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
      <form>
        <label htmlFor="name">
          Nome:
          <input
            name="name"
            type="text"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          disabled={ disabledButton }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.configPush }
        >
          Configuração
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  addToken: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToken: (value1, value2) => dispatch(fetchToken(value1, value2)),
});

export default connect(null, mapDispatchToProps)(Login);
