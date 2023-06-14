import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../redux/actions';

class Timer extends Component {
  componentDidMount() {
    const SECOND = 1000;
    Timer.timerID = setInterval(
      () => this.tick(),
      SECOND,
    );
  }

  tick = () => {
    const { currentTime, dispatch } = this.props;

    if (currentTime > 0) {
      dispatch(setTime(currentTime - 1));
    }
  };

  render() {
    const { currentTime } = this.props;
    return (
      <div>
        Timer:
        {' '}
        { currentTime }
      </div>
    );
  }
}

Timer.propTypes = {
  currentTime: PropTypes.number,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currentTime: state.player.seconds,
});

export default connect(mapStateToProps)(Timer);
