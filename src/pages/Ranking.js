import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.props;
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    localStorage.setItem('ranking', JSON.stringify(sortedRanking));
    return (
      <main>
        <button
          type="button"
          id="home-button"
          data-testid="btn-go-home"
          onClick={ this.goHome }
        >
          início
        </button>
        <h1 data-testid="ranking-title">Ranking</h1>

        {sortedRanking.map((result, index) => (
          <div key={ index }>
            <img src={ result.imageURL } alt="Imagem by Gravata" />
            <div>
              <h4
                data-testid={ `player-name-${index}` }
              >
                { `${result.name}` }
              </h4>
              <h5
                data-testid={ `player-score-${index}` }
              >
                { result.score }
              </h5>
            </div>
          </div>
        ))}
      </main>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  imageURL: state.player.imageURL,
  ranking: state.player.ranking,
});

export default connect(mapStateToProps)(Ranking);
