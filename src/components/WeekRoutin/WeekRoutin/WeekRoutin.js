import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import './WeekRoutin.css'
import GetWeekRoutinList from '../GetWeekRoutinList/GetWeekRoutinList'

const WeekRoutin = ({ dayValue, userObj }) => {
  const dayCalculationArray = [] //클릭한 날짜 일주일간 배열 생성
  const CalculationNum = dayValue.getDay() //클릭한 날짜 인덱스 배열로 변환코드
  let startdayValue = dayjs(dayValue)
  startdayValue = startdayValue.add(-CalculationNum, 'day')

  for (let i = 0; i < 7; i++) {
    const inputDay = dayjs(startdayValue)
    const resultDay = inputDay.add(i, 'day')
    dayCalculationArray.push(resultDay)
  }
  return (
    <div className="WeekRoutin">
      {dayCalculationArray.map((date, index) => (
        <div key={index}>
          <GetWeekRoutinList userObj={userObj} date={date} />
        </div>
      ))}
    </div>
  )
}
export default WeekRoutin
//ㅇㅇ
