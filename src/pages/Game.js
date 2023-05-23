import React, { Component } from 'react';
import Header from '../components/Header';
import Trivia from '../components/Trivia';

class Game extends Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Trivia history={ history } />
      </>
    );
  }
}

export default Game;
