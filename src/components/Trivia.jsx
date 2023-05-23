// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Trivia extends Component {
  state = {
    questions: [],
    questionsId: 0,
  };

  componentDidMount() {
    this.getQuestions();
  }

  verifyTriviaAPI = (resultAPI) => {
    const { history } = this.props;
    console.log(history);
    const errorCode = 0;
    if (resultAPI.response_code !== errorCode) {
      history.push('/');
      localStorage.setItem('token', '');
    } else {
      this.setState({
        questions: resultAPI.results,
      });
    }
  };

  getQuestions = async () => {
    // const { token } = this.props;
    const token = localStorage.getItem('token');
    console.log(token);
    try {
      // const URL_API_TRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const URL_API_TRIVIA = 'https://opentdb.com/api.php?amount=5&token=null';
      console.log(URL_API_TRIVIA);
      const response = await fetch(URL_API_TRIVIA);
      const resultAPI = await response.json();
      console.log(resultAPI);
      this.verifyTriviaAPI(resultAPI);
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { questions } = this.state;
    console.log(questions);
    return (
      <div>

      </div>
    );
  }
}

Trivia.propTypes = ({
  // token: PropTypes.string,
}).isRequired;

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Trivia);
