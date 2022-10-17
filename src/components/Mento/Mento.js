import { async } from '@firebase/util'
import React, { useEffect, useState } from 'react'
import { authService, dbService } from '../../fbase'
import './Mento.css'

const Mento = () => {
  const [dataArray, setDataArray] = useState([])
  const [mentoDataArray, setMentoDataArray] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState('')
  const [mentoSet, setMentoSet] = useState(false)
  const [mentoApearSet, setMentoApearSet] = useState(false)
  const [mentoId, setMentoId] = useState('')
  const [mentoringText, setMentoringText] = useState('')

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
    })
    dbService.collection('comunity').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.user === userObj.uid
      })
      const mentoSelectedArray = selectedUserArray.filter((data) => {
        return data.mento === mentoId
      })
      setDataArray(mentoSelectedArray)
    })
    dbService.collection('comunity').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.user === mentoId
      })
      const resultArray = selectedUserArray.filter((data) => {
        return data.touser === userObj.uid
      })
      setMentoDataArray(resultArray)
    })
  }, [userObj, mentoId])

  const mentoApearHandler = (e) => {
    e.preventDefault()
    mentoSet ? setMentoSet(false) : setMentoApearSet(true)
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    setMentoSet(true)
    setMentoId(e.target.value)
    setMentoApearSet(false)
  }
  const onChangementoringTextHandler = (e) => {
    setMentoringText(e.target.value)
  }
  const enterkey = async (e) => {
    const createdAt = Date.now()
    if (window.event.keyCode == 13) {
      await dbService
        .collection('comunity')
        .doc(userObj.uid + createdAt)
        .set({
          createdAt,
          user: userObj.uid,
          mento: mentoId,
          text: mentoringText,
          name: userObj.displayName,
          photoURL: userObj.photoURL,
          touser: '',
        })
        .then(
          await dbService.collection('mentomatch').doc(userObj.uid).set({
            user: userObj.uid,
            mento: mentoId,
          }),
        )
      setMentoringText('')
    }
    e.target.parentNode.previousElementSibling.scrollTo(
      0,
      e.target.parentNode.previousElementSibling.scrollHeight,
    )
  }
  const enterClickHandler = async (e) => {
    const createdAt = Date.now()
    await dbService
      .collection('comunity')
      .doc(userObj.uid + createdAt)
      .set({
        createdAt,
        user: userObj.uid,
        mento: mentoId,
        text: mentoringText,
        name: userObj.displayName,
        photoURL: userObj.photoURL,
        touser: '',
      })
      .then(
        await dbService.collection('mentomatch').doc(userObj.uid).set({
          user: userObj.uid,
          mento: mentoId,
        }),
      )
    setMentoringText('')
    e.target.parentNode.previousElementSibling.scrollTo(
      0,
      e.target.parentNode.previousElementSibling.scrollHeight,
    )
  }

  // 두개 합치고 -> 날짜별 정렬
  const mentoPageOutputArray = [...dataArray, ...mentoDataArray]
  const sortedmentoPageArray = mentoPageOutputArray.sort((a, b) => {
    return a.createdAt - b.createdAt
  })

  return (
    <div className="mentoComunityMain">
      {mentoApearSet ? (
        <form className="selectMentoOptionBox">
          <select
            onChange={onSubmitHandler}
            className="selectMentoOptionBoxSelect"
          >
            <option>상담을 원하는 멘토를 선택해주세요.</option>
            <option value="R1ln1cgK3AcMmG1HbjQVEPKl28d2">호영</option>
            <option value="kBfiEAr4KmhQ82PxCcL42C2JDdB2">서연</option>
          </select>
        </form>
      ) : (
        <></>
      )}
      {mentoSet ? (
        <div className="mentoComunityMainContents">
          <div className="mentComunityDiv">
            {sortedmentoPageArray.map((data, index) => (
              <div
                className={
                  data.user === data.mento ? 'talkBox-left' : 'talkBox-right'
                }
                key={index}
              >
                <div className="mentoringUserBox">
                  <img
                    className="userMentoringProfile"
                    src={data.photoURL}
                  ></img>
                </div>
                <span className="mentoringTextBox">{data.text}</span>
              </div>
            ))}
          </div>
          <div className="mentoComunityChatContainer">
            <input
              type="text"
              className="mentoCoumunityChat"
              value={mentoringText}
              onChange={onChangementoringTextHandler}
              onKeyUp={enterkey}
            ></input>
            <button onClick={enterClickHandler}>Enter</button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {isLoggedIn ? (
        <img
          className="callMento"
          src="/Img/coach.jpg"
          onClick={mentoApearHandler}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
export default Mento
