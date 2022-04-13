import React from 'react'
import './Home.scss'
import ListRestaurant from './ListRestaurant'
import ListReview from './ListReview'
type Props = {}

function Home({}: Props) {
  return (
    <div className="Home">
      <h1 className="HomeTitle">
        Giới thiệu địa điểm ẩm thực Cần Thơ
      </h1>
      <hr />
      <ListRestaurant/>
      <hr />
      <ListReview/>
    </div>
  )
}

export default Home