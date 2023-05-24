import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

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
    const { history } = this.props;
    history.push('/Ranking');
  };

  render() {
    const { score, assertions, history } = this.props;
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
          ranking
        </button>
        <button
          id="btn-play-again"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
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
