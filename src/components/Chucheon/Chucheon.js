import React from 'react'
import './Chucheon.css'

const Chucheon = (props) => {
  return (
    <div className="container">
      <div className='containerimg'>
      <a href={props.pageNum}>
        <img src={props.imgSet} />
      </a>
      </div>
      <div className='containertext'>
      <p className="text">{props.text}</p>
      </div>
    </div>
  )
}
export default Chucheon
