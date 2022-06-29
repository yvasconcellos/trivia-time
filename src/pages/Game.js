import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

const ONE_SECOND = 1000;

class Game extends React.Component {
  state = {
    questions: [],
    index: 0,
    click: false,
    interval: 30,
    shuffle: [],
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
    }
    this.intervalId = setInterval(() => {
      this.setState((prev) => ({ interval: prev.interval - 1 }));
    }, ONE_SECOND);
    const { questions } = this.state;
    this.shuffleAnswers(questions);
  }

  shuffleAnswers = (param) => {
    const { index } = this.state;
    const arrayAnswer = [...param[index].incorrect_answers];
    const shuffleIndex = Math.floor(Math.random() * (arrayAnswer.length + 1));
    arrayAnswer.splice(shuffleIndex, 0, param[index].correct_answer);
    this.setState({ shuffle: arrayAnswer });
  }

  nextQuestion = () => {
    const { index, questions } = this.state;
    const limit = 4;
    if (index === limit) {
      this.setState({ index: 0 }, () => this.shuffleAnswers(questions));
    } else {
      this.setState((prev) => ({ index: prev.index + 1 }),
        () => this.shuffleAnswers(questions));
    }
    this.setState({ click: false,
      interval: 30 });
  }

  handleClick = () => {
    this.setState({ click: true });
  }

  render() {
    const { name, score, email } = this.props;
    const { index, questions, click, interval, shuffle } = this.state;
    return (
      <>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt={ `Imagem de ${name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ score }</p>
        </header>
        { interval >= 0 && <p>{ interval }</p>}
        { (questions.length > 0)
        && (
          <>
            <p data-testid="question-category">
              {`Categoria: ${questions[index].category}`}
            </p>
            <p data-testid="question-text">{ questions[index].question }</p>
            <section data-testid="answer-options">
              {shuffle.map((answer, i) => (
                (answer === questions[index].correct_answer)
                  ? (
                    <button
                      key={ i }
                      data-testid="correct-answer"
                      type="button"
                      onClick={ this.handleClick }
                      className={ click && 'correct' }
                      disabled={ interval <= 0 }
                    >
                      { questions[index].correct_answer }
                    </button>)
                  : (
                    <button
                      key={ i }
                      data-testid={ `wrong-answer-${i}` }
                      type="button"
                      onClick={ this.handleClick }
                      className={ click && 'incorrect' }
                      disabled={ interval <= 0 }
                    >
                      { answer }
                    </button>)))}

            </section>
          </>)}
        { (click || interval <= 0)
          && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.nextQuestion }
            >
              Next
            </button>
          )}

      </>
    );
  }
}

Game.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = (state) => ({
  email: state.playerReducer.gravatarEmail,
  name: state.playerReducer.name,
  score: state.playerReducer.score,
});

export default connect(mapStateToProps, null)(Game);
