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
    await addToken();
    history.push('/game');
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
      </form>
    );
  }
}

Login.propTypes = {
  addToken: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addToken: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
