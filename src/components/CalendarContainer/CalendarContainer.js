import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import './CalendarContainer.css'
import InputModal from '../InputModal/InputModal'
import GetData from '../GetData/GetData'

const CalendarContainer = ({ date, userObj, setDate, setIsSetDate }) => {
  //모달창 부르기
  const [page, setPage] = useState('')

  function shutDownHandler() {
    setPage('')
  }
  function onChange(date) {
    setDate(date)
    setIsSetDate(true)
  }
  const callInputHandler = () => {
    setPage(
      <InputModal shutDown={shutDownHandler} userObj={userObj} date={date} />,
    )
  }
  const month = new Date(date).getMonth() + 1
  const day = new Date(date).getDate()

  return (
    <div className="CalendarContainer">
      <div></div>
      <Calendar calendarType="US" onChange={onChange} value={date} />
      <div>{page}</div>
      <div className="diaryContainer">
        <button className="inmydiary" onClick={callInputHandler}>
          {month}월 {day}일 나의 운동 기록하기
        </button>
        <GetData
          userObj={userObj}
          date={date}
          setPage={setPage}
          shutDownHandler={shutDownHandler}
        />
      </div>
    </div>
  )
}
export default CalendarContainer
