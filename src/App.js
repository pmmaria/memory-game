import { useState } from 'react';
import { cardList } from './features/CardList';
import './App.css';
import SingleCard from './features/SingleCard';

function App() {
  const [cards, setCards] = useState([]);

  const randomCards = () => {
    const shuffledCards = cardList.concat(cardList)
      .sort(() => Math.random() - 0.5)
      .map((card, i) => ({ ...card, id: i }))
    setCards(shuffledCards)
  }

  console.log(cards);

  return (
    <div className='App'>
      <header className='app-title'>
        <h1>MEMORY GAME</h1>
      </header>
      <button
        className='button-start ba br-pill dib fw6 white pv3 ph5 mb4 no-underline grow'
        onClick={randomCards}>
        New Game
      </button>
      <div className='grid-img'>
        {
          cards.map(card => (
            <SingleCard
              key={card.id}
              card={card}
            />
          ))}

      </div>
    </div>

  )
}


export default App;
