import React from 'react'
import './BoardContainer.css'
import ImgBoard from './ImgBoard/ImgBoard'
import RoutinVideo from './RoutinVideo/RoutinVideo'

const BoardContainer = (props) => {
  return (
    <div className="BoardContainer">
      <ImgBoard userObj={props.userObj} date={props.date} />
      <RoutinVideo userObj={props.userObj} date={props.date} />
    </div>
  )
}
export default BoardContainer
