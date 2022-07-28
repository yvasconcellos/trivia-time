import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, score, email } = this.props;
    return (
      <header
      className='grid
      grid-cols-2
      w-screen
      bg-violet-900
      items-center
      p-2
      '
      >
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt={ `Imagem de ${name}` }
          data-testid="header-profile-picture"
          className='rounded-lg
          justify-self-start
          h-12
          '
        />
        <div
        className='justify-self-end
        mx-4
        '
        >
        <p data-testid="header-player-name"
          className='text-white'
          >{ `User: ${name}` }</p>
        <p data-testid="header-score"
          className='text-white'
        >{ `Score: ${score}` }</p>
          </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
