import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendScore } from '../redux/actions';
import Header from '../Component/Header';
import {decode} from 'html-entities';

const ONE_SECOND = 1000;
const ONE = 1;
const TWO = 2;
const THREE = 3;
const TEN = 10;

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    click: false,
    interval: 30,
    shuffle: [],
    correct: true,
    sum: 0,
    assertions: 0,
  }

  async componentDidMount() {
    const { history } = this.props;
    const tokenStorage = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${tokenStorage}`,
    );
    const data = await response.json();
    const errorCode = 3;
    if (data.response_code === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: data.results });
      this.shuffleAnswers(data.results);
    }
    this.intervalId = setInterval(() => {
      this.setState((prev) => ({ interval: prev.interval - 1 }));
    }, ONE_SECOND);
    // const { questions } = this.state;
    // this.shuffleAnswers(questions);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  shuffleAnswers = (param) => {
    if (param) {
      const { index } = this.state;
      const arrayAnswer = [...param[index].incorrect_answers];
      const shuffleIndex = Math.floor(Math.random() * (arrayAnswer.length + 1));
      arrayAnswer.splice(shuffleIndex, 0, param[index].correct_answer);
      this.setState({ shuffle: arrayAnswer });
    }
  }

  nextQuestion = () => {
    const { index, questions } = this.state;
    const { history } = this.props;
    const limit = 4;
    if (index === limit) {
      history.push('/feedback');
    } else {
      this.setState((prev) => ({ index: prev.index + 1 }),
        () => this.shuffleAnswers(questions));
    }
    this.setState({ click: false,
      interval: 30 });
  }

  dispatchScore = () => {
    const { dispatch } = this.props;
    const { sum, assertions } = this.state;
    dispatch(sendScore(sum, assertions));
  }

  sumPoints = (correct, interval) => {
    let pointDifficulty = 0;
    const { questions } = this.state;
    const answer = questions.filter((question) => question.correct_answer === correct);
    if (answer[0].difficulty === 'easy') {
      pointDifficulty = ONE;
    } else if (answer[0].difficulty === 'medium') {
      pointDifficulty = TWO;
    } else if (answer[0].difficulty === 'hard') {
      pointDifficulty = THREE;
    }
    this.setState((prev) => ({
      sum: prev.sum + (TEN + (interval * pointDifficulty)),
      assertions: prev.assertions + 1,
    }), this.dispatchScore);
  }

  handleClick = ({ target }) => {
    const { interval } = this.state;
    const { value } = target;
    if (value) this.sumPoints(target.innerHTML, interval);
    this.setState({ click: true });
  }

  render() {
    const { index, questions, click, interval, shuffle, correct } = this.state;
    return (
      <div
      className='flex flex-col'
      >
        <Header />
        { interval >= 0 ? 
        <div
        className='
        flex justify-center
        my-8
        w-screen
        '
        >
        <p
        className='bg-white p-8 interval'
        >{ interval }</p>
        </div> :
        <div
        className='
        flex justify-center
        my-8
        w-screen
        '
        >
        <p
        className='bg-white p-8 interval'
        >0</p>
        </div>
        }
        { (questions && questions.length > 0)
        && (
          <>
          <div>
          <p
          className='text-center
          text-white
          text-2xl'
          >Category</p>
            <p data-testid="question-category"
            className='text-center
            text-white'
            >
              {decode(questions[index].category)}
            </p>
            <p data-testid="question-text"
            className='text-center
            text-white
            text-xl
            m-3
            '
            >{ decode(questions[index].question) }</p>
            </div>
            <div
            className='flex flex-col items-center'
            >
            <section data-testid="answer-options"
            className='flex flex-wrap
            w-1/2
            justify-center
            '
            >
              {shuffle.map((answer, i) => (
                (answer === questions[index].correct_answer)
                  ? 
                  (
                    <button
                      key={ i }
                      data-testid="correct-answer"
                      type="button"
                      onClick={ this.handleClick }
                      className={ `m-2
                      w-1/2
                      py-1
                      rounded-lg
                      disabled:bg-slate-900
                      disabled:text-slate-800
                      bg-slate-800
                      text-white
                      ${click && 'bg-green-500'}` }
                      disabled={ interval <= 0 }
                      value={ correct }
                      >
                      { decode(questions[index].correct_answer) }
                    </button>)
                  : (
                    <button
                      key={ i }
                      data-testid={ `wrong-answer-${i}` }
                      type="button"
                      onClick={ this.handleClick }
                      className={ `m-2
                      w-1/2
                      py-1
                      rounded-lg
                      disabled:bg-slate-900
                      disabled:text-slate-800
                      bg-slate-800
                      text-white
                      ${click && 'bg-red-500'}` }
                      disabled={ interval <= 0 }
                      >
                      { decode(answer) }
                    </button>
                    )
                    ))}
            </section>
        { (click || interval <= 0)
          && (
            <button
            data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
              className={ `m-2
                      w-1/4
                      py-1
                      rounded-lg
                      bg-slate-100
                      text-black`}
            >
              Next
            </button>
          )}
          </div>
          </>)}

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Game);
