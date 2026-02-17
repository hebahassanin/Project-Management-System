import React from 'react'
import noDataImg from "../../../../assets/images/noData.png"

export default function NoData() {
  return (
    <div className='text-end'>
      <img className='w-50 ' src={noDataImg} alt=''></img>
      </div>
  )
}
