import React from 'react'
import Buttons from './Buttons'
import './Popups.css'
import App from '../App'

const Popups = (props) => {
  return (
    <div className="popup">
      <h1>Congrats!</h1>
      <h2>You won.</h2>
      <img className="animated-gif" src="img/win.gif" alt="gif" />
      <Buttons buttonStyle="btn-primary-solid" onClick={props.action}>
        Play Again!
      </Buttons>
    </div>
  )
}

export default Popups
