import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeUser } from '../redux/actions';

class Trivia extends Component {
  componentDidMount() {
    // this.getQuestions();
  }

  verifyTriviaAPI = (resultAPI) => {
    // console.log(resultAPI);
    const errorCode = 0;
    if (resultAPI.response_code !== errorCode) {
      const { history, dispatch } = this.props;
      history.push('/');
      dispatch(removeUser());
    }
  };

  getQuestions = async () => {
    // const { token } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    const URL_API_TRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;
    console.log(URL_API_TRIVIA);
    const response = await fetch(URL_API_TRIVIA);
    const resultAPI = await response.json();
    console.log(resultAPI);
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
