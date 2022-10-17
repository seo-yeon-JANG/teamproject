import React, { useState } from 'react'
import './TipWindow.css'

const TipWindow = (props) => {
  const [show, setShow] = useState(false)

  const onClickHandler = () => {
    setShow(!show)
  }
  return (
    <div className="absoluteTip">
      <img
        onClick={onClickHandler}
        src="/Img/question.png"
        className="questionTipImg"
      />
      <div className={show ? 'showTipBox' : 'noShowTipBox'}>
        {props.children}
      </div>
    </div>
  )
}
export default TipWindow
