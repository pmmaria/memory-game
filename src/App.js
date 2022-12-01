import React from 'react'
import './App.css';
import { useEffect, useState } from 'react';
import { cardList } from './features/CardList';
import SingleCard from './features/SingleCard';
import Buttons from './features/Buttons';

function App() {

  // Create State for variables of the app
  const [cards, setCards] = useState([]); //start the game with an empty object.
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [cardOne, setCardOne] = useState(null); //Start the game with no card selected. When we click on card one, we need to update this state.
  const [cardTwo, setCardTwo] = useState(null);
  const [disabled, setDisabled] = useState(null);

  // function to duplicate and shuffle the images for the game(this function updates state of setCards)
  const randomCards = () => {
    const shuffledCards = cardList.concat(cardList)
      .sort(() => Math.random() - 0.5)
      .map((card, i) => ({ ...card, id: i }))
    setCardOne(null)
    setCardTwo(null)
    setTurns(0)
    setMatches(0)
    setTimeout(() => setCards(shuffledCards), 200)
  }

  //function to handle a choice
  const handleChoice = (card) => {
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  //Use effect to handle with side effects.
  // In this case we need to wait until user clicks both cards before comparison.
  useEffect(() => {
    if (cardOne && cardTwo) {
      setDisabled(true)
      if (cardOne.src === cardTwo.src) {
        setMatches(prevMatches => prevMatches + 1)
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === cardOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 700)
      }
    }
  }, [cardOne, cardTwo])

  //Function to reset selection for next turn
  const resetTurn = () => {
    setTurns(prevTurns => prevTurns + 1)
    setTimeout(() => setDisabled(false), 400)
    setCardOne(null)
    setCardTwo(null)
  }

  // Starts a new game automatically when opening the web app
  useEffect(() => {
    randomCards()
  }, [])


  return (
    <div className='App'>
      {/* ---------title --------- */}
      <header className='app-title'>
        <h1>Memory Match</h1>
      </header>

      {/* --------Start game button */}
      <div className='btn-start'>
        <Buttons
          buttonStyle='btn-complementary-solid'
          onClick={randomCards}
        >Start Game</Buttons>
      </div>
      {/*-------- Grid for cards  */}
      <div className='game-container'>
        <div className='gameboard'>
          <div className='grid-img'>
            {
              cards.map(card => (
                <SingleCard
                  key={card.id}
                  card={card}                 //I pass {card} as a prop to SingleCard.jsx, so I can use it.
                  handleChoice={handleChoice} //this way I can use handleChoice as prop in SingleCard.jsx
                  flipped={card === cardOne || card === cardTwo} //the cards flip when they are clicked and remain flipped when match
                  match={card.matched}
                  disabled={disabled}
                />
              ))}
          </div>
        </div>

        <div className='results-counter'>
          <p>Turns: {turns}</p>
          <p>Matches: {matches}</p>
        </div>
      </div>
    </div>

  )
}

export default App;
