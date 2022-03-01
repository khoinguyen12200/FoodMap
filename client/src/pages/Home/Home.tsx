import React from 'react'
import './Home.scss'
import ListRestaurant from './ListRestaurant'
type Props = {}

function Home({}: Props) {
  return (
    <div className="Home">
      <ListRestaurant/>
      <hr />
    </div>
  )
}

export default Home