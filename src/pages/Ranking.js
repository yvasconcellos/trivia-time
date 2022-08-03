import React from 'react';
import PropTypes from 'prop-types';
import { MD5 } from 'crypto-js';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const arrayLocal = JSON.parse(localStorage.getItem('ranking') || '[]');
    arrayLocal.sort((a, b) => b.score - a.score);
    this.setState({ ranking: arrayLocal });
  }

  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { ranking } = this.state;
    return (
      <div
      className='flex flex-col
      w-80
      sm:w-96
      '
      >
        <h1 data-testid="ranking-title"
        className='text-white text-3xl text-center my-3'
        >Ranking</h1>
        <div
        className='flex justify-center'
        >
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.redirectLogin }
          className='text-white w-fit'
          >
          Home
        </button>
        </div>
        { ranking.map((cur, index) => (
          <div
          className='flex
          items-center
          justify-around
          bg-violet-700
          p-2
          rounded-lg
          my-2
          ' 
          key={ cur.name }>
            <img
              src={ `https://www.gravatar.com/avatar/${MD5(cur.gravatarEmail).toString()}` }
              alt={ `Imagem de ${cur.name}` }
              data-testid="header-profile-picture"
            />
            <div
            >
              <p data-testid={ `player-name-${index}` }
                className='text-white'
              >{`User: ${cur.name} `}</p>
              <p data-testid={ `player-score-${index}` }
                className='text-white'
              >{`Score: ${cur.score} `}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
