import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    const { frontImg, backImg, flipped, onClick } = this.props;
    const img = flipped ? frontImg : backImg;
    return (
      <div className="Card" onClick={onClick}>
        <img src={img} alt="" />
      </div>
    );
  }
}

export default Card;