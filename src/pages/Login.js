import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';

class Login extends Component {
  state = {
    emailInput: '',
    nameInput: '',
    isButtonDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { emailInput, nameInput } = this.state;
      this.setState({
        isButtonDisabled: !(validator.isEmail(emailInput) && nameInput.length > 0),
      });
    });
  };

  render() {
    const { emailInput, nameInput, isButtonDisabled } = this.state;
    return (
      <div className="login-page">
        <h1>Login</h1>
        <form className="login-form">
          <label htmlFor="emailInput">
            <input
              type="text"
              data-testid="input-gravatar-email"
              name="emailInput"
              id="emailInput"
              placeholder="Digite e-mail do Gravatar"
              value={ emailInput }
              onChange={ (e) => this.handleInput(e) }
            />
          </label>
          <label htmlFor="nameInput">
            <input
              type="text"
              data-testid="input-player-name"
              name="nameInput"
              id="nameInput"
              placeholder="Digite seu nome"
              value={ nameInput }
              onChange={ (e) => this.handleInput(e) }
            />
          </label>
          <Link to="/game">
            <button
              type="button"
              id="play-button"
              data-testid="btn-play"
              disabled={ isButtonDisabled }
              // onClick={ () => (dispatch(loginAction(emailInput))) }
            >
              JOGAR
            </button>
          </Link>
        </form>
      </div>

    );
  }
}

export default Login;
