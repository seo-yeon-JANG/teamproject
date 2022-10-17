import React, { useEffect, useState } from 'react'
import { dbService } from '../../fbase'
import dayjs from 'dayjs'
import classes from './GetData.module.css'
import TipWindow from '../TipWindow/TipWindow'

const GetData = ({ userObj, date, setPage, shutDownHandler }) => {
  const userId = userObj
  const dateId = dayjs(date).format('YY-MM-DD')
  const [data, setData] = useState([])

  useEffect(() => {
    //실시간으로 DB에서 받아오기.
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
    })
  }, [date])
  const deleteHandler = async (docId) => {
    const ok = window.confirm(
      `[확인]을 누르면 해당 내용이 삭제됩니다. 해당 내용을 수정하시려면   기록하기를 통해 수정해주세요.`,
    )
    if (ok) {
      await dbService.collection('healthycogy').doc(docId.createdId).delete()
    }
  }

  return (
    <div className={classes.dataBox}>
      <TipWindow>
        <h2>달력에서</h2>
        <h2> 정보가져오기</h2>
        <hr></hr>
        <ul>
          <li className="TipLi">
            원하는 해당 일자를 클릭하면 내 기록을 볼 수 있어요.
          </li>
          <li className="TipLi">일자를 선택하면 운동루틴 추천이 떠요.</li>
          <li className="TipLi">
            운동루틴을 정하면 루틴에 맞는 영상이 플레이됩니다.
          </li>
        </ul>
      </TipWindow>
      {data.length === 0 ? (
        <div className={classes.diaryContainer}>
          <p className="input">내용을 입력해주세요.</p>
          <br></br>
          <p className="input">
            기록하고 싶은 해당 일자를 누르고 △ 입력하기 버튼을 누르면 입력할 수
            있어요.
          </p>
        </div>
      ) : (
        data.map((data, index) => (
          <div key={index}>
            <div onClick={deleteHandler.bind(null, data)}>
              <ul>
                <span className={classes.GetDataBoxTitle}>+ 운동</span>
                <li className={classes.mealLi}>{data.routin} </li>
                <span className={classes.GetDataBoxTitle}>+ 식단</span>
                <li className={classes.mealLi}>
                  <br />
                  아침 : {data.breakfast}
                </li>
                <li className={classes.mealLi}>점심 : {data.lunch}</li>
                <li className={classes.mealLi}>저녁 : {data.dinner}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
export default GetData
