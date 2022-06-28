import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const { name, score, email } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Imagem de ${name}` }
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps, null)(Game);
