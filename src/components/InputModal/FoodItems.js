import React from 'react'

function FoodItems({ list }) {
  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          <div>{item}</div>
        </div>
      ))}
    </div>
  )
}
export default FoodItems
