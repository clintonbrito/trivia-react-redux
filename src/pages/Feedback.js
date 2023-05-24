import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  goRanking = () => {
    const { history } = this.props;
    history.push('/Ranking');
  };

  render() {
    const { score } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-total-score">
          {score}
        </h2>
        <h2 data-testid="feedback-total-question">
          Question
        </h2>
        <button
          type="button"
          id="btn-ranking"
          data-testid="btn-ranking"
          onClick={ this.goRanking }
        >
          ranking
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
});

export default connect(mapStateToProps)(Feedback);
