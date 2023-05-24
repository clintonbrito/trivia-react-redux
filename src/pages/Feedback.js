import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-total-score">
          {this.props.score}
        </h2>
        <h2 data-testid="feedback-total-question">
          Question
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.score,
});

export default connect(mapStateToProps)(Feedback);
