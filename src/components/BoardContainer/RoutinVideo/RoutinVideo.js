import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import ReactPlayer from 'react-player'
import { dbService } from '../../../fbase'

import './RoutinVideo.css'
import dayjs from 'dayjs'

const SLIDE_NUMBER_VALUE = 4
const RoutinVideo = ({ userObj, date }) => {
  const userId = userObj
  const dateId = dayjs(date).format('YY-MM-DD')
  const [videoArray, setVideoArray] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    function isEmptyObj(obj) {
      if (obj.constructor === Object && Object.keys(obj).length === 0) {
        return true
      }
      return false
    }
    dbService.collection('healthycogy').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedUserArray = dataArray.filter((data) => {
        return data.user === userId
      })
      const outputArray = selectedUserArray.filter((data) => {
        return data.date == dateId
      })
      setData(outputArray)
      const routinValue = { ...outputArray[0] }
      isEmptyObj(routinValue)
        ? getBasicRoutinVideo()
        : getRoutinVideo(routinValue.routin)
    })
  }, [dateId])

  const getRoutinVideo = async (routinInput) => {
    await dbService.collection('Routin').onSnapshot((snapshot) => {
      const routinValue = routinInput
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedRoutinArray = dataArray.filter((data) => {
        return data.routin === routinValue
      })
      const resultArray = selectedRoutinArray.map((data) => {
        return data.url
      })
      setVideoArray(resultArray)
    })
  }
  //기본영상 뽑기
  const getBasicRoutinVideo = async () => {
    await dbService.collection('Routin').onSnapshot((snapshot) => {
      const dataArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }))
      const selectedRoutinArray = dataArray.filter((data) => {
        return data.routin === 'basic'
      })
      const resultArray = selectedRoutinArray.map((data) => {
        return data.url
      })
      setVideoArray(resultArray)
    })
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const randomNums = []
  let count = 0
  for (let i = 0; count < SLIDE_NUMBER_VALUE; i++) {
    const randomNum = Math.floor(Math.random() * 7)
    if (!randomNums.includes(randomNum)) {
      randomNums.push(randomNum)
      count++
    } else {
    }
  }
  const resultArray = []
  for (let i of randomNums) {
    resultArray.push(videoArray[i])
  }
  return (
    <div className="RoutinVideoContainer">
      <p> 일일 추천 운동 영상</p>
      <Slider {...settings}>
        {resultArray.map((urlPath, index) => (
          <ReactPlayer
            key={index}
            className="player"
            url={urlPath}
            width="90%"
            height="350px"
            playing={true}
            muted={true}
            controls={true}
          />
        ))}
      </Slider>
    </div>
  )
}
export default RoutinVideo
