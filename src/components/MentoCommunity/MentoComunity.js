import React, { useEffect, useState } from 'react'
import { authService, dbService } from '../../fbase'
import UserBoard from './UserBoard'
import './MentoComunity.css'

const MentoCoumunity = () => {
  const [userObj, setUserObj] = useState('')
  const [userBoardProps, setUserBoardProps] = useState([])

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user)
      } else {
      }
    })

    dbService.collection('mentomatch').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.mento === userObj.uid
      })
      const myMentiIdArray = selectedUserArray.map((data) => data.user)
      const finalArray = myMentiIdArray.filter((data) => data !== userObj.uid)
      setUserBoardProps(finalArray)
    })
  }, [userObj])

  return (
    <div className="MentoComunityFullBox">
      {userBoardProps.map((data, index) => (
        <UserBoard
          photoURL={userObj.photoURL}
          userId={data}
          mentoId={userObj.uid}
          key={index}
        />
      ))}
    </div>
  )
}
export default MentoCoumunity
