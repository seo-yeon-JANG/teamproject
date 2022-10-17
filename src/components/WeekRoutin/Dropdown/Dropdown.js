import React, { useEffect, useState } from 'react'
import { dbService } from '../../../fbase'
import './Dropdown.css'
import DropdownLi from './DropdownLi/DropdownLi'

const Dropdown = ({ data, userId, dateId }) => {
  const routin = data ? data.routin : 'Breaktime'
  const createdId = userId + dateId
  const [basicRoutinArray, setBasicRoutinArray] = useState([])
  const [showing, setShowing] = useState(false)
  const [inputRoutin, setInputRoutin] = useState(routin)
  const [inputResultArray, setInputResultArray] = useState([])
  const [dataExist, setDataExist] = useState('')
  const [routinDataExist, setRoutinDataExist] = useState([])
  const [init, setInit] = useState(true)

  useEffect(() => {
    const basicRoutindbRef = dbService.collection('basicRoutin')
    basicRoutindbRef.get().then((doc) => {
      const dataArray = doc.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectBasicRoutin = dataArray.filter((data) => data.id === routin)
      setBasicRoutinArray(selectBasicRoutin[0].routin)
    })

    //데이터 유무 판단
    dbService.collection('healthycogy').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedData = dataArray.filter((data) => {
        return data.createdId === createdId
      })
      setDataExist(selectedData)
    })
    //나의 루틴이 있는지 확인
    dbService.collection('MyRoutin').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedDataRoutin = dataArray.filter((data) => {
        return data.createdId === createdId
      })
      if (selectedDataRoutin.length === 0) {
        setRoutinDataExist([])
      } else {
        setRoutinDataExist(selectedDataRoutin[0].routin)
      }
    })
  }, [data, init])

  const toggleMenu = () => {
    setShowing(!showing) // on,off 개념 boolean
  }
  const editMyRoutin = (event) => {
    const IndexNumber = event.target.dataset.index
    const inputNewValue = event.target.value
    const editedBasicRoutinArray = basicRoutinArray.splice(
      IndexNumber,
      1,
      inputNewValue,
    )
    setInputResultArray(editedBasicRoutinArray)
  }
  // 삭제를 하려면
  //basciRoutin은 컴포넌트에 그려지는 것들
  //resultArray는 데이터베이스에 저장되는 것들
  //삭제하려는 인덱스를 얻어서 => basicRoutin을 삭제 => 컴포넌트에 안그려진다.
  //resultArray를 basicRoutin으로 입력 => 컴포넌트에 그려진 value값이 db에 저장된다.

  const deleteEditMyroutin = (event) => {
    const IndexNumber = event.target.dataset.index
    basicRoutinArray.splice(IndexNumber, 1)
    setInputResultArray(basicRoutinArray)
  }
  const routinInputHandler = async () => {
    await dbService
      .collection('MyRoutin')
      .doc(createdId)
      .set({
        createdId,
        user: userId,
        date: dateId,
        routin: inputResultArray,
      })
      .then(
        dataExist.length === 0
          ? await dbService
              .collection('healthycogy')
              .doc(createdId)
              .set({
                createdId,
                user: userId,
                date: dateId,
                routin: inputRoutin ? inputRoutin : 'Breaktime',
                breakfast: ['식단을 넣어주세요.'],
                lunch: ['식단을 넣어주세요.'],
                dinner: ['식단을 넣어주세요.'],
              })
          : await dbService
              .collection('healthycogy')
              .doc(createdId)
              .update({ routin: inputRoutin })
              .then(setShowing(false)),
      )
  }
  const closeDropdownHandler = () => {
    if (window.confirm('등록없이 닫으시겠습니까?')) {
      setShowing(false)
      setInit(!init)
    }
  }
  const selectHandler = (e) => {
    setInputRoutin(e.target.value)
  }
  return (
    <div className="dropdownBox">
      <div className="dropdown">
        <button className="routinBtn" type="button" onClick={toggleMenu}>
          {dateId} 루틴 보기
        </button>
        <ul className={!showing ? 'dropdown-menu' : 'dropdown-menu show'}>
          <p className="closedropParent">
            <span className="closedrop" onClick={closeDropdownHandler}>
              X
            </span>
          </p>
          <div>
            <strong>오늘의 운동 : </strong>
            <select onChange={selectHandler} value={inputRoutin}>
              <option value={'lowerbody' || ''}>lowerbody</option>
              <option value={'back' || ''}>back</option>
              <option value={'chest' || ''}>chest</option>
              <option value={'shoulder' || ''}>shoulder</option>
              <option value={'arm' || ''}>arm</option>
              <option value={'Breaktime' || ''}>Breaktime</option>
            </select>
          </div>
          {routinDataExist.length === 0
            ? basicRoutinArray.map((data, index) => (
                <DropdownLi
                  key={index}
                  index={index}
                  data={data}
                  editMyRoutin={editMyRoutin}
                  deleteEditMyroutin={deleteEditMyroutin}
                />
              ))
            : Array.isArray(routinDataExist)
            ? routinDataExist.map((data, index) => (
                <DropdownLi
                  key={index}
                  index={index}
                  data={data}
                  editMyRoutin={editMyRoutin}
                  deleteEditMyroutin={deleteEditMyroutin}
                />
              ))
            : '배열이 아닙니다.'}
          <button className="droproutinBtn" onClick={routinInputHandler}>
            나의 루틴으로 등록
          </button>
        </ul>
      </div>
    </div>
  )
}
export default Dropdown
