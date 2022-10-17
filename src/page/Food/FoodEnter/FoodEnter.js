import React from 'react'
import './FoodEnter.css'

const FoodEnter = (props) => {
  return (
    <div className="imgFoodBox" onClick={props.onClickImg}>
      <img className="talent" src={props.imgsrc}></img>
    </div>
  )
}

export default FoodEnter
