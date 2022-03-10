import React from 'react'
import './Home.scss'
import ListRestaurant from './ListRestaurant'
import ListReview from './ListReview'
type Props = {}

function Home({}: Props) {
  return (
    <div className="Home">
      <ListRestaurant/>
      <hr />
      <ListReview/>
    </div>
  )
}

export default Home