// import PropTypes from 'prop-types';
import React, { Component, ReactDOM } from 'react';
import { connect } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import Login from '../pages/Login';

class Trivia extends Component {
  state = {
    questions: [],
  };

  componentDidMount() {
    const { history } = this.props;
    console.log(this.props);

    this.getQuestions();
  }

  verifyTriviaAPI = (resultAPI) => {
    // console.log(resultAPI);
    const { history } = this.props;
    const errorCode = 0;
    if (resultAPI.response_code !== errorCode) {
      console.log(this.props);
      history.push('/');
      // ReactDOM.render(
      //   <MemoryRouter>
      //     <Route path="/" component={ Login } />
      //   </MemoryRouter>,
      // document.getElementById('root'),
      // );
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
      const URL_API_TRIVIA = `https://opentdb.com/api.php?amount=5&token=${token}`;
      // const URL_API_TRIVIA = 'https://opentdb.com/api.php?amount=5&token=null';
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
    return (
      <div>Trivia</div>
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
