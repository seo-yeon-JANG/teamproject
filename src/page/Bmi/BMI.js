import React, { useState } from 'react'
import './BMI.css'

const BMI = () => {
  const [BMI, setBMI] = useState()
  const [Img, setImg] = useState('./Img/BMI1.png')

  function add(event) {
    event.preventDefault()
    const height = document.getElementById('height').value
    const weight = document.getElementById('weight').value
    let bmi = +weight / (+height / 100) ** 2

    if (+bmi < 18.5) {
      setImg('./Img/Bmi.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 저체중입니다.`)
      return
    } else if (+bmi >= 18.5 && +bmi < 23) {
      setImg('./Img/BMI2.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 정상 체중입니다.`)
      return
    } else if (+bmi >= 23 && +bmi < 25) {
      setImg('./Img/BMI3.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 과체중입니다.`)
      return
    } else if (+bmi >= 25 && +bmi < 30) {
      setImg('./Img/BMI4.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 경도 비만입니다.`)
      return
    } else if (+bmi >= 30 && +bmi < 35) {
      setImg('./Img/BMI5.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 중상도 비만입니다.`)
      return
    } else if (+bmi >= 35) {
      setImg('./Img/BMI6.png')
      setBMI(`당신의 bmi 지수는 ${bmi.toFixed(1)}, 비만도는 고도 비만입니다.`)
      return
    }
  }
  //BMI 계산기 추가
  return (
    <div className="BMIpage">
      <div className="cal">
        <h2 className="title">BMI 계산기</h2>
        <form>
          <label htmlFor="height" className="nab">
            신장
          </label>
          <input id="height" type="number"></input>
          <label htmlFor="weight" className="nab">
            체중
          </label>
          <input id="weight" type="number"></input>
          <button className="bmiButton" onClick={add}>
            계산
          </button>
        </form>
        <div className="imgresult">
          <img className="imgEl" src={Img} />
        </div>
        <div className="result">결과 : {BMI}</div>
      </div>
    </div>
  )
}
export default BMI
