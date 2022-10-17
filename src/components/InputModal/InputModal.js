import React, { useState } from 'react'
import { dbService } from '../../fbase'
import dayjs from 'dayjs'
import classes from './InputModal.module.css'
import FoodItems from './FoodItems'

const InputModal = (props) => {
  const userId = props.userObj
  const dateId = props.date
  const [inputRoutin, setInputRoutin] = useState(null)
  const [breakfast, setBreakfast] = useState('')
  const [breakfastlist, setBreakfastlist] = useState([])
  const [lunch, setLunch] = useState('')
  const [lunchlist, setLunchlist] = useState([])
  const [dinner, setDinner] = useState('')
  const [dinnerlist, setDinnerlist] = useState([])

  const handleSelect = (e) => {
    setInputRoutin(e.target.value)
  }
  const addItembreakfast = () => {
    setBreakfastlist([...breakfastlist, breakfast])
  }
  const addItemlunch = () => {
    setLunchlist([...lunchlist, lunch])
  }
  const addItemdinner = () => {
    setDinnerlist([...dinnerlist, dinner])
  }
  const breakfastChangeHandler = (e) => {
    setBreakfast(e.target.value)
  }
  const lunchChangeHandler = (e) => {
    setLunch(e.target.value)
  }
  const dinnerChangeHandler = (e) => {
    setDinner(e.target.value)
  }
  const dateIdValue = dayjs(dateId).format('YY-MM-DD')
  const addHandler = async (event) => {
    event.preventDefault()
    const createdId = userId + dateIdValue
    await dbService
      .collection('healthycogy')
      .doc(createdId)
      .set({
        createdId,
        user: userId,
        date: dateIdValue,
        routin: inputRoutin ? inputRoutin : 'Breaktime',
        breakfast:
          breakfastlist.length === 0 ? ['식단을 넣어주세요.'] : breakfastlist,
        lunch: lunchlist.length === 0 ? ['식단을 넣어주세요.'] : lunchlist,
        dinner: dinnerlist.length === 0 ? ['식단을 넣어주세요.'] : dinnerlist,
      })
    props.shutDown()
  }

  return (
    <div>
      <div className={classes.backdrop} onClick={props.shutDown} />
      <div className={classes.modal}>
        <header className={classes.header}>
          <h2>리스트</h2>
        </header>
        <div className={classes.content}>
          <label htmlFor="part">운동</label>
          <select onChange={handleSelect} value={inputRoutin}>
            <option value={null || ''}>루틴 선택</option>
            <option value={'lowerbody' || ''}>lowerbody</option>
            <option value={'back' || ''}>back</option>
            <option value={'chest' || ''}>chest</option>
            <option value={'shoulder' || ''}>shoulder</option>
            <option value={'arm' || ''}>arm</option>
            <option value={'Breaktime' || ''}>Breaktime</option>
          </select>
          <div>
            <label htmlFor="food">아침</label>
            <input
              type="text"
              value={breakfast}
              id="ex"
              onChange={breakfastChangeHandler}
            />
            <button onClick={addItembreakfast}>➕</button>
          </div>
          <FoodItems list={breakfastlist} />
          <div>
            <label htmlFor="food">점심</label>
            <input
              type="text"
              value={lunch}
              id="ex"
              onChange={lunchChangeHandler}
            />
            <button onClick={addItemlunch}>➕</button>
          </div>
          <FoodItems list={lunchlist} />
          <div>
            <label htmlFor="food">저녁</label>
            <input
              type="text"
              value={dinner}
              id="ex"
              onChange={dinnerChangeHandler}
            />
            <button onClick={addItemdinner}>➕</button>
          </div>
          <FoodItems list={dinnerlist} />
          <button className={classes.button} onClick={addHandler}>
            등록
          </button>
        </div>
        <footer className={classes.actions}></footer>
      </div>
    </div>
  )
}

export default InputModal
