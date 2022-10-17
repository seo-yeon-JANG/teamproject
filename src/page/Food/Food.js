import React, { useState } from 'react'
import FoodEnter from './FoodEnter/FoodEnter'
import './Food.css'

const Food = (props) => {
  const [mealImg, setMealImg] = useState(
    <img src="./Img/hungertext.JPG" id="hunger" />,
  )
  const onChangeHandler = (event) => {
    const howMeal = event.target.value
    if (howMeal === '3') {
      setMealImg(
        <div className="enterContainer">
          <div className="sicdanContainer">
            <FoodEnter
              imgsrc="./Img/soragang.JPG"
              onClickImg={onClickGangImgHandler}
            />
            <h1>강소라의 식단보기</h1>
          </div>
          <div className="sicdanContainer">
            <FoodEnter
              imgsrc="./Img/apink.JPG"
              onClickImg={onClickapinkImgHandler}
            />
            <h1>에이핑크의 식단보기</h1>
          </div>
        </div>,
      )
    } else if (howMeal === '4') {
      setMealImg(
        <div className="enterContainer">
          <div className="sicdanContainer">
            <FoodEnter
              imgsrc="./Img/sinyoung.JPG"
              onClickImg={onClickSinyoungImgHandler}
            />
            <h1>김신영의 식단보기</h1>
          </div>
          <div className="sicdanContainer">
            <FoodEnter
              imgsrc="./Img/boram.JPG"
              onClickImg={onClickBoramkImgHandler}
            />
            <h1>박보람의 식단보기</h1>
          </div>
        </div>,
      )
    } else {
      setMealImg(<img src="./Img/hungertext.JPG" id="hunger" />)
    }
  }
  const onClickHandlerThree = () => {
    setMealImg(
      <div className="enterContainer">
        <div className="sicdanContainer">
          <FoodEnter
            imgsrc="./Img/soragang.JPG"
            onClickImg={onClickGangImgHandler}
          />
          <h1>강소라의 식단보기</h1>
        </div>
        <div className="sicdanContainer">
          <FoodEnter
            imgsrc="./Img/apink.JPG"
            onClickImg={onClickapinkImgHandler}
          />
          <h1>에이핑크의 식단보기</h1>
        </div>
      </div>,
    )
  }
  const onClickHandlerFive = () => {
    setMealImg(
      <div className="enterContainer">
        <div className="sicdanContainer">
          <FoodEnter
            imgsrc="./Img/sinyoung.JPG"
            onClickImg={onClickSinyoungImgHandler}
          />
          <h1>김신영의 식단보기</h1>
        </div>
        <div className="sicdanContainer">
          <FoodEnter
            imgsrc="./Img/boram.JPG"
            onClickImg={onClickBoramkImgHandler}
          />
          <h1>박보람의 식단보기</h1>
        </div>
      </div>,
    )
  }
  const onClickGangImgHandler = () => {
    setMealImg(
      <div className="flexFoodBox">
        <img src="./Img/three.JPG" className="imgsic" />
        <div className="textBox">
          <h2>강소라 다이어트 식단</h2>
          <div className="textCon">
            <h3 className="h3-tex">그녀만의 다이어트 규칙 3가지</h3>
            <h4 className="h4-tex">1. 야식 절대 금지</h4>
            <h4 className="h4-tex">2. 최대한 움직이기</h4>
            <h4 className="h4-tex">3. 아침, 점심, 저녁! 세 끼 먹기</h4>
          </div>
          <div className="textCon2">
            <h3 className="h4-tex">
              발레와 필라테스와 같은 운동들을 통한 부가효과 UP!
            </h3>
            <h3 className="h4-tex">호박죽을 통한 이뇨작용과 붓기제거!</h3>
            <h3 className="h4-tex">
              호박죽은 피부미용과 노화방지, 변비예방에도 특효약!
            </h3>
          </div>
          <button onClick={onClickHandlerThree}>뒤로가기</button>
        </div>
      </div>,
    )
  }
  const onClickapinkImgHandler = () => {
    setMealImg(
      <div className="flexFoodBox">
        <img src="./Img/three-apink.JPG" className="imgsic" />
        <div className="textBox">
          <h2>에이핑크 다이어트 식단</h2>
          <div className="textCon">
            <h3 className="h3-tex">"체지방량 20.6 → 8.4"의 기적의 식단</h3>
            <h4 className="h4-tex">1. 식단만으로는 안돼! 운동도 병행!</h4>
            <h4 className="h4-tex">2. 다이어트 보조제도 적절히 활용!</h4>
            <h4 className="h4-tex">
              3. 쓰리라챠 소스, 깻잎 등 식사에 변화주기!
            </h4>
          </div>
          <div className="textCon2">
            <h3 className="h4-tex">간식이 필요하다면 바나나와 아몬드 소량 </h3>
            <h3 className="h4-tex">
              다이어트 식단을 무조건 따라하기보다 자신에 맞는 식단을 찾는 것이
              중요!
            </h3>
          </div>
          <button onClick={onClickHandlerThree}>뒤로가기</button>
        </div>
      </div>,
    )
  }
  const onClickSinyoungImgHandler = () => {
    setMealImg(
      <div className="flexFoodBox">
        <img src="./Img/five-sinyoung.JPG" className="imgsic" />
        <div className="textBox">
          <h2>김신영 다이어트 식단</h2>
          <div className="textCon">
            <h3 className="h3-tex">건강한 44사이즈를 만들고 싶다면!</h3>
            <h4 className="h4-tex">
              1. 맛있는 식단을 찾는다면 멸치볶음 다이어트 김밥!
            </h4>
            <h4 className="h4-tex">2. 칼로리 조절이 힘든 드레싱은 No!</h4>
          </div>
          <div className="textCon2">
            <h3 className="h4-tex">
              재미있는 식단을 좀 더 자세히 알고싶다면 KBS2 예능프로그램 "빼고파"
              보기!
            </h3>
            <h3 className="h4-tex">식단이 너무 단조롭다면 김치정도는 OK!</h3>
            <h3 className="h4-tex">
              그녀만의 다양한 다이어트 식단이 궁금하다면{' '}
              <a href="https://search.naver.com/search.naver?query=%EA%B9%80%EC%8B%A0%EC%98%81%20%EB%8B%A4%EC%9D%B4%EC%96%B4%ED%8A%B8%20%EC%8B%9D%EB%8B%A8&nso=&where=view&sm=tab_nmr&mode=normal">
                여기
              </a>
              를 클릭
            </h3>
          </div>
          <button onClick={onClickHandlerFive}>뒤로가기</button>
        </div>
      </div>,
    )
  }
  const onClickBoramkImgHandler = () => {
    setMealImg(
      <div className="flexFoodBox">
        <img src="./Img/five-boram.JPG" className="imgsic" />
        <div className="textBox">
          <h2>박보람 다이어트 식단</h2>
          <div className="textCon">
            <h3 className="h3-tex">33kg 감량! 체질까지 바꾸는 식단!</h3>
            <h4 className="h4-tex">
              1. 하루 먹을 양을 나누어 먹는다고 생각하기
            </h4>
            <h4 className="h4-tex">
              2. 에너지가 필요한 날에는 +@ 음식 섭취하기
            </h4>
            <h4 className="h4-tex">
              3. 비타민, 다이어트 음료로 과식을 예방하기
            </h4>
          </div>
          <div className="textCon2">
            <h3 className="h4-tex">
              급격한 신체변화가 되기때문에 몸에 부담은 있을 수 있기에 +@ 식단을
              추천!
            </h3>
            <h3 className="h4-tex">영양 보조제로 영양불균형에 신경쓰기!</h3>
          </div>
          <button onClick={onClickHandlerFive}>뒤로가기</button>
        </div>
      </div>,
    )
  }
  return (
    <div className="main-container">
      <div className="ab">
        <h1 className="main_title">연예인 다이어트 식단</h1>
        <label htmlFor="food-num">식사 횟수 선택 </label>
        <select id="food-num" onChange={onChangeHandler}>
          <option value="0">선택하세요.</option>
          <option value="3">3끼</option>
          <option value="4">5끼</option>
        </select>
      </div>
      <section className="imgContent">{mealImg}</section>
    </div>
  )
}
export default Food
