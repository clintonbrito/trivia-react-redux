import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../redux/actions';

class Trivia extends Component {
  componentDidMount() {
    this.getQuestions();
  }

  verifyTriviaAPI = (resultAPI) => {
    console.log(resultAPI);
    const errorCode = 0;
    if (resultAPI.results.length === errorCode) {
      const { history, dispatch } = this.props;
      history.push('/');
      dispatch(removeUser());
    }
  };

  getQuestions = async () => {
    // const { token } = this.props;
    const response = await fetch('https://opentdb.com/api.php?amount=5&token=3');
    // const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const resultAPI = await response.json();
    this.verifyTriviaAPI(resultAPI);
  };

  render() {
    return (
      <div>Trivia</div>
    );
  }
}

Trivia.propTypes = ({
  token: PropTypes.string,
}).isRequired;

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Trivia);
