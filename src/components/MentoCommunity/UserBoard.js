import React, { useEffect, useState } from 'react'
import { dbService } from '../../fbase'
import './UserBoard.css'

const UserBoard = ({ userId, mentoId, photoURL }) => {
  const [dataArray, setDataArray] = useState([])
  const [mentoDataArray, setMentoDataArray] = useState([])
  const [mentoringText, setMentoringText] = useState('')
  const [userName, setUserName] = useState('')
  useEffect(() => {
    dbService.collection('comunity').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.user === userId
      })
      const selectedMentoArray = selectedUserArray.filter((data) => {
        return data.mento === mentoId
      })
      setDataArray(selectedMentoArray)
      setUserName(
        selectedUserArray.length > 0 ? selectedUserArray[0].name : 'Unknown',
      )
    })

    dbService.collection('comunity').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.touser === userId
      })

      const selectedMentoArray = selectedUserArray.filter((data) => {
        return data.mento === mentoId
      })
      setMentoDataArray(selectedMentoArray)
    })
  }, [userId])

  const onChangementoringTextHandler = (e) => {
    setMentoringText(e.target.value)
  }
  const enterkey = async (e) => {
    const createdAt = Date.now()
    if (window.event.keyCode == 13) {
      await dbService
        .collection('comunity')
        .doc(mentoId + createdAt)
        .set({
          createdAt,
          user: mentoId,
          mento: mentoId,
          touser: userId,
          text: mentoringText,
          photoURL: '/Img/coach.jpg',
          name: mentoId,
        })
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
      .doc(mentoId + createdAt)
      .set({
        createdAt,
        user: mentoId,
        mento: mentoId,
        touser: userId,
        text: mentoringText,
        photoURL: '/Img/coach.jpg',
        name: mentoId,
      })
    setMentoringText('')
    e.target.parentNode.previousElementSibling.scrollTo(
      0,
      e.target.parentNode.previousElementSibling.scrollHeight,
    )
  }

  //날짜순 정렬
  const mentoPageOutputArray = [...dataArray, ...mentoDataArray]
  const sortedmentoPageArray = mentoPageOutputArray.sort((a, b) => {
    return a.createdAt - b.createdAt
  })

  return (
    <div className="mentoMentoPageComunityMainContents">
      <div className="mentComunityDiv">
        <h1>{userName}님과의 대화</h1>
        {sortedmentoPageArray.map((data, index) => (
          <div
            className={data.user === mentoId ? 'talkBox-right' : 'talkBox-left'}
            key={index}
          >
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
  )
}

export default UserBoard
