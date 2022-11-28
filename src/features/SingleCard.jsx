import React from 'react'
import './SingleCard.css'

const SingleCard = ({ card, handleChoice, flipped, match }) => {
  //inside { } I have the props to connect with App.js
  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped' : ''}>
        <div className={match ? 'match' : ''}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="img/back-card.jpg"
            alt="card back"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default SingleCard
