import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Chucheon from '../../components/Chucheon/Chucheon'
import Slider from '../../components/Slide/Slider'
import YouCon from '../../components/YouCon/YouCon'
import styled from 'styled-components'

import './Intro.css'

const Intro = (props) => {
  const [isTip, setIsTip] = useState(false)
  const plusBoxHandler = () => {
    setIsTip(true)
  }

  const Common = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px;
    @media screen and (max-width: 500px) {
      flex-direction: column;
    }
  `

  const introMiddle2 = './Img/120.jpg'
  const introMiddle4 = './Img/Checklist.jpg'
  const introMiddle1 = './Img/9kta_1h59_211101.jpg'
  const introMiddle3 =
    '원하는 끼수를 정하면 유명 연예인 다이어트 식단을 볼 수 있어요!!'
  const introMiddle5 = '매일 변하는 몸을 한눈에 보기 쉽게 사진으로 기록해봐요!'
  const introMiddle6 = '식단, 운동 등 달력에 기록해봐요!'
  const sliderHandler = () => {
    setIsTip(false)
  }

  return (
    <div>
      <main>
        <div id="backgroundImg">
          <div className="background-Img"></div>
        </div>
        <div className="pBox">
          <div className="info">
            <h2 className="introH2">"맞춤 다이어트 플랫폼"</h2>
            <p className="info1">
              다이어트 성공의 가능성이 성공으로 꽃 피울 수 있도록 헬시코기가
              도와드립니다😀
            </p>
            <div className="chucheon-container">
              <Chucheon imgSet={introMiddle2} text={introMiddle3} />
              <Chucheon imgSet={introMiddle4} text={introMiddle5} />
              <Chucheon imgSet={introMiddle1} text={introMiddle6} />
            </div>
          </div>
          <div>
            <div id="section3">
              <h2 className="dietinfo">다이어트에 대한 정보/꿀팁</h2>
              <YouCon />
            </div>
          </div>
          <div className="fixedContent">
            {isTip ? (
              <Slider onCLickFn={sliderHandler} />
            ) : (
              <div className="plusBox" onClick={plusBoxHandler}>
                ⭐️꿀팁
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
export default Intro
