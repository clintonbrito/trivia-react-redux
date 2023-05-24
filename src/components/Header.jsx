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
          <div>
            <h2>Pontuação: </h2>
            <h2 data-testid="header-score">{score}</h2>
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
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  imageURL: state.player.imageURL,
  token: state.tokenReducer.token,
});

export default connect(mapStateToProps)(Header);
