import React from 'react'
import FoodBoard from '../FoodBoard/FoodBoard'
import WeekRoutin from '../WeekRoutin/WeekRoutin/WeekRoutin'
import './WeekContainer.css'

const WeekContainer = ({ userObj, date, setIsSetDate }) => {
  const onClickHandler = () => {
    setIsSetDate(false)
  }
  return (
    <div className="WeekContainer">
      <div className="tar">
        <button
          type="button"
          className="closeButtonWeekCon"
          onClick={onClickHandler}
        >
          닫기
        </button>
      </div>
      <WeekRoutin userObj={userObj} dayValue={date} />
      <hr></hr>
      <FoodBoard userObj={userObj} date={date} />
    </div>
  )
}
export default WeekContainer
