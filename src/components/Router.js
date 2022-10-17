import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { authService, dbService } from '../fbase'
import BMI from '../page/Bmi/BMI'
import Food from '../page/Food/Food'
import Intro from '../page/Intro/Intro'
import Footer from './Footer/Footer'
import HeadeLine from './HeadeLine/HeadeLine'
import MentoCoumunity from './MentoCommunity/MentoComunity'
import MyStorage from './MyStorage/MyStorage'
import RequireLogin from './RequireLogin/RequireLogin'

const Router = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState('')
  const [mentoIs, setMentoIs] = useState(false)

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      dbService.collection('mentoId').onSnapshot((snapshot) => {
        const dataArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }))
        const selectedUserArray = dataArray.map((data) => {
          return data.id
        })
        selectedUserArray.includes(userObj.uid)
          ? setMentoIs(true)
          : setMentoIs(false)
      })
    })
  }, [userObj, mentoIs])
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <HeadeLine user={userObj} isLoggedIn={isLoggedIn} isMento={mentoIs} />
      ) : (
        <RequireLogin />
      )}
      <Routes>
        <Route path="/mentoring" element={<MentoCoumunity />} />
        <Route path="/" element={<Intro isLoggedIn={isLoggedIn} />} />
        <Route path="/bmi" element={<BMI />} />
        <Route path="/food" element={<Food />} />
        <Route path="/Mystorage" element={<MyStorage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
export default Router
