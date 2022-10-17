import React from 'react'
import TipWindow from '../../TipWindow/TipWindow'
import './ImgBoard.css'
import MyDietProcess from './MyDietProcess/MyDietProcess'
import MyPicture from './Mypicture/MyPicture'

const ImgBoard = (props) => {
  return (
    <div className="ImgBoard">
      <TipWindow>
        <h2>변해가는 나,</h2>
        <h2> 기록하기</h2>
        <hr></hr>
        <ul>
          <li className="TipLi">하루하루 변해가는 나를 기록해봐요.</li>
          <li className="TipLi">일주일 전과는 많이 변하셨나요?</li>
        </ul>
      </TipWindow>
      <MyPicture userObj={props.userObj} date={props.date} />
      <MyDietProcess userObj={props.userObj} date={props.date} />
    </div>
  )
}
export default ImgBoard
