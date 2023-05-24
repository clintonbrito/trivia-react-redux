import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTime } from '../redux/actions';

export class Timer extends Component {
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
  currentTime: state.playerReducer.seconds,
});

export default connect(mapStateToProps)(Timer);

// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';

// function Timer() {
//   const TIME_LIMIT = 30;
//   const SECOND = 1000;
//   const [seconds, setSeconds] = useState(TIME_LIMIT);

//   useEffect(() => {
//     if (seconds > 0) {
//       const timer = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, SECOND);
//       return () => clearInterval(timer);
//     }
//   }, [seconds]);

//   return (
//     <div>
//       { useDispatch({
//         type: 'SET_TIMER',
//         seconds,
//       }) }
//       <h1>
//         Timer:
//         {seconds}
//         s
//       </h1>
//     </div>
//   );
// }

// export default Timer;
