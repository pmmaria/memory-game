import React from 'react'
import './Buttons.css'

const style = [
  'btn-primary-solid',
  'btn-primary-outline',
  'btn-complementary-solid',
  'btn-complementary-outline',
]

const Buttons = ({ children, type, onClick, buttonStyle }) => {
  const checkStyle = style.includes(buttonStyle) ? buttonStyle : style[0]

  return (
    <button className={`btn ${checkStyle}`} onClick={onClick} type={type}>
      {children}
    </button>
  )
}

export default Buttons
