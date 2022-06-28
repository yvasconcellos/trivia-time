import React from 'react';

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
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
