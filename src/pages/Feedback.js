import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Component/Header';
import { resetGame } from '../redux/actions';
import happiness from '../images/happiness.png';
import sadness from '../images/sadness.png';


const THREE = 3;

class Feedback extends React.Component {
  componentDidMount() {
    const { score, name, gravatarEmail } = this.props;
    const ranking = { score, name, gravatarEmail };
    const arrayLocal = JSON.parse(localStorage.getItem('ranking') || '[]');
    localStorage.setItem('ranking', JSON.stringify([...arrayLocal, ranking]));
  }

  redirectLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(resetGame());
    history.push('/');
  }

  redirectRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { assertions, score } = this.props;
    return (
      <>
        <Header />
        {assertions < THREE ? 
        <div
        className='flex flex-col
        items-center
        my-3
        w-screen
        '
        >
          <img
          className='
          w-28
          my-2
          '
          src={sadness} alt='Sad Face'/>
          <p data-testid="feedback-text"
          className='text-white text-2xl'
          >Could be better...</p>
        </div>
          : 
          <div
        className='flex flex-col
        items-center
        my-3
        w-screen
        '
        >
            <img 
            className='w-28
            my-2
            '
            src={happiness} alt='Happy Face'/>
            <p data-testid="feedback-text"
            className='text-white text-2xl'
            >Well Done!</p> 
          </div>
            }
        <p data-testid="feedback-total-score"
          className='text-white'
        >{`Score: ${score} `}</p>
        <p data-testid="feedback-total-question"
          className='text-white'
        >{`Assertions: ${assertions} `}</p>
        <div
        className='flex
        w-1/2
        my-2
        '
        >
        <button
          type="button"
          data-testid="btn-play-again"
          className='m-2
          w-1/2
          py-1
          rounded-lg
          bg-slate-800
          text-white
          '
          onClick={ this.redirectLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          className='m-2
          w-1/2
          py-1
          rounded-lg
          bg-slate-800
          text-white
          '
          onClick={ this.redirectRanking }
        >
          Ranking
        </button>
          </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
