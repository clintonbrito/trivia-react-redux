import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveURL } from '../redux/actions';
// import { urlGravatar } from '../redux/actions';

class Header extends Component {
  componentDidMount() {
    const { dispatch, gravatarEmail } = this.props;
    const hashGravatar = md5(gravatarEmail).toString();
    const imageURL = `https://www.gravatar.com/avatar/${hashGravatar}`;
    dispatch(saveURL(imageURL));
  }

  render() {
    const { name, score, imageURL } = this.props;
    return (
      <header>
        <div>
          <img
            data-testid="header-profile-picture"
            src={ imageURL }
            alt={ `Foto de ${name}` }
          />
          <div data-testid="header-player-name">
            <h2>{name}</h2>
          </div>
          <div data-testid="header-score">
            <h2>{`Pontuação: ${score}`}</h2>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  dispatch: PropTypes.func,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}).isRequired;

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  score: state.playerReducer.score,
  gravatarEmail: state.playerReducer.gravatarEmail,
  imageURL: state.playerReducer.imageURL,
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Header);
