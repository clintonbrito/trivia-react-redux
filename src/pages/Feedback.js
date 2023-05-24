import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

INICIAL_STATE = {
  feedbackMsg: '',
};
class Feedback extends React.Component {
  render() {
    return (
      <div>
        <h2 data-testid="feedback-total-score">
      Score
        </h2>
        <h2 data-testid="feedback-total-question">
      Question
        </h2>
      </div>
    );
  }
}

// Feedback.propTypes = {
// player: PropTypes.shape({
//  assertions: PropTypes.number,
//  score: PropTypes.number,
// }).isRequired,
// };

export default Feedback;
