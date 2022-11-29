import { useEffect, useState } from 'react';
import { cardList } from './features/CardList';
import './App.css';
import SingleCard from './features/SingleCard';

function App() {

  // Create State for variables of the app
  const [cards, setCards] = useState([]); //start the game with an empty object.
  const [turns, countTurns] = useState(0);
  const [cardOne, setCardOne] = useState(null); //Start the game with no card selected. When we click on card one, we need to update this state.
  const [cardTwo, setCardTwo] = useState(null);

  // function to duplicate and shuffle the images for the game(this function updates state of setCards)
  const randomCards = () => {
    const shuffledCards = cardList.concat(cardList)
      .sort(() => Math.random() - 0.5)
      .map((card, i) => ({ ...card, id: i }))
    setCards(shuffledCards)
    countTurns(0)
  }

  //function to handle a choice
  //Pass this function's name as prop to SingleCard component, so I can use the function there
  const handleChoice = (card) => {
    //If cardOne is not null (null is the starting state), it means cardOne was already selected by click. So we need to update cardTwo,
    //If cardOne is null, it means we haven't selected any card, so cardOne needs to be updated
    cardOne ? setCardTwo(card) : setCardOne(card);
  }

  //Use effect to handle with side effects. In this case we need to wait until user clicks both cards before comparison.
  useEffect(() => {
    if (cardOne && cardTwo) {
      if (cardOne.src === cardTwo.src) {
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
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [cardOne, cardTwo])

  //Function to reset selection 
  const resetTurn = () => {
    setCardOne(null)
    setCardTwo(null)
    countTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className='App'>

      {/* ---------title --------- */}
      <header className='app-title'>
        <h1>MEMORY GAME</h1>
      </header>

      {/* --------Start game button */}
      <button
        className='button-start ba br-pill dib fw6 white pv3 ph5 mb4 no-underline grow'
        onClick={randomCards}>New Game</button>

      {/*-------- Grid for cards  */}
      <div className='grid-img'>
        {
          cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}                 //I pass {card} as a prop to SingleCard.jsx, so I can use it.
              handleChoice={handleChoice} //this way I can use handleChoice as prop in SingleCard.jsx
              flipped={card === cardOne || card === cardTwo} //the cards flip when they are clicked and remain flipped when match
              match={card.matched}
            />
          ))}
      </div>
    </div>

  )
}

export default App;
