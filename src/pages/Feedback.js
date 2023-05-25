import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { addToRanking, clearAssertion } from '../redux/actions';

class Feedback extends React.Component {
  feedbackMessage = (assertions) => {
    const number = 3;
    if (assertions < number) {
      return 'Could be better...';
    }

    if (assertions >= number) {
      return 'Well Done!';
    }
  };

  goRanking = () => {
    const { history, dispatch } = this.props;
    dispatch(addToRanking());
    dispatch(clearAssertion());
    history.push('/Ranking');
  };

  goBack = () => {
    const { history, dispatch } = this.props;
    dispatch(addToRanking());
    dispatch(clearAssertion());
    history.push('/');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <h2 data-testid="feedback-text">{this.feedbackMessage(assertions)}</h2>
        <button
          type="button"
          id="btn-ranking"
          data-testid="btn-ranking"
          onClick={ this.goRanking }
        >
          Ranking
        </button>
        <button
          id="btn-play-again"
          data-testid="btn-play-again"
          onClick={ this.goBack }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.player.score,
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
