import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends Component {
  goHome = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const ranking = [
      {
        name: 'joao',
        score: 488,
      },
      {
        name: 'joao',
        score: 568,
      },
      {
        name: 'joao',
        score: 965,
      },
      {
        name: 'joao',
        score: 753,
      },
      {
        name: 'maria',
        score: 168,
      },
      {
        name: 'pedro',
        score: 5965,
      },
      {
        name: 'ana',
        score: 167,
      },
    ];
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);

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
                { `${index + 1}.${result.name}` }
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
  name: state.playerReducer.name,
  score: state.playerReducer.score,
  gravatarEmail: state.playerReducer.gravatarEmail,
  imageURL: state.playerReducer.imageURL,
});

export default connect(mapStateToProps)(Ranking);
