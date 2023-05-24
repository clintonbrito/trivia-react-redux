import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import validator from 'validator';
import { connect } from 'react-redux';
import { addUser } from '../redux/actions';

class Login extends Component {
  state = {
    emailInput: '',
    nameInput: '',
    isButtonDisabled: true,
    wasSettingsClicked: false,
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

  handlePlay = async () => {
    const { history, dispatch } = this.props;
    const { emailInput, nameInput } = this.state;
    dispatch(addUser(nameInput, emailInput));
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    const { token } = data;
    localStorage.setItem('token', token);
    history.push('/game');
  };

  handleSettings = () => {
    const { wasSettingsClicked } = this.state;
    this.setState({
      wasSettingsClicked: !wasSettingsClicked,
    });
  };

  render() {
    const { emailInput, nameInput, isButtonDisabled, wasSettingsClicked } = this.state;
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
          <button
            type="button"
            id="play-button"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handlePlay }
          >
            JOGAR
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Configurações
          </button>
        </form>
        { wasSettingsClicked && (
          <div>
            <h2 data-testid="settings-title">Configurações</h2>
            <p>Aqui vai ter configurações</p>
          </div>
        )}
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Login);
