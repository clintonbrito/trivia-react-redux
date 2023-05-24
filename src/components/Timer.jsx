import React, { useState, useEffect } from 'react';

function Timer() {
  const TIME_LIMIT = 30;
  const SECOND = 1000;
  const [seconds, setSeconds] = useState(TIME_LIMIT);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, SECOND);

      return () => clearInterval(timer);
    }
  }, [seconds]);

  return (
    <div>
      <h1>
        Timer:
        {seconds}
        s
      </h1>
    </div>
  );
}

export default Timer;
