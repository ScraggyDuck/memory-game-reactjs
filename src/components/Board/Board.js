import React, { Component } from 'react';
import Card from '../Card/Card';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.cards,
      checkers: [],
      completed: []
    }
  }

  render() {
    return(
      <div className="Board">
        {this.renderCard()}
      </div>
    )
  }

  renderCard = () => {
    let result = null;
    const { checkers, completed, cards } = this.state;
    if(completed.length === 8){
      return(
        <div>
           <h1>You Win!</h1>
           <button onClick={this.resetGame}>Reset game</button>
        </div>
      )
    }
    const newCards = cards.map(card => ({
      ...card,
      flipped:checkers.find(c => c.id === card.id) ||completed.includes(card.type)
    }));
    result = newCards.map(card => (
      <Card {...card} onClick={() => this.onCardClick(card)} key={card.id} />
    ));
    return result;
  }

  resetGame = () => {
    this.setState({
      completed: []
    });
  }

  onCardClick = card => {
    const { checkers, completed } = this.state;
    if (this.checkersFull(checkers) || this.cardAlreadyInCheckers(checkers, card)) return;

    const newCheckers = [...checkers, card];
    this.setState({
      checkers: newCheckers
    });

    const cardsInCheckersMatched = this.validateCheckers(newCheckers);
    if (cardsInCheckersMatched) {
      this.setState({
        completed: [...completed, newCheckers[0].type]
      });
    };

    if (this.checkersFull(newCheckers)) {
      this.resetCheckersAfter(1000);
    }
  }

  checkersFull = checkers => checkers.length === 2;

  cardAlreadyInCheckers = (checkers, card) => checkers.length === 1 && checkers[0].id === card.id;

  validateCheckers = checkers => checkers.length === 2 && checkers[0].type === checkers[1].type;

  resetCheckersAfter = time => {
    setTimeout(() => {
      this.setState({
        checkers: []
      });
    }, time);
  }
}

export default Board
