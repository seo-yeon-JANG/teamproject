import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { authService, firebaseInstance } from '../../fbase'
import './RequireLogin.css'

const RequireLogin = () => {
  const onSocialHandler = async (event) => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider()
    const data = await authService.signInWithPopup(provider)
  }
  return (
    <div className="headerDiv">
      <div id="page_logo">
        <a href="/">헬시코기</a>
      </div>
      <nav className="navLogContainer">
        <div className="containerBox">
          <div className="requireloginDiv">
            <label className="logininfo" htmlFor="googleLogin">
              구글ID로 로그인해서 나만의 다이어트 다이어리를 관리해봐요.
            </label>
            <button
              className="google"
              id="googleLogin"
              onClick={onSocialHandler}
            >
              로그인
            </button>
          </div>
          <ul className="requireNavDiv">
            <li>
              <NavLink
                style={{ textDecoration: 'none', color: 'white' }}
                to="/bmi"
              >
                BMI계산기
              </NavLink>
            </li>
            <li>
              <NavLink
                style={{ textDecoration: 'none', color: 'white' }}
                to="/food"
              >
                식단추천
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
export default RequireLogin
