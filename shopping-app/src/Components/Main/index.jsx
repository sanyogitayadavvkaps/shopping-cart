import React from 'react'
import MainLayOutes from '../../layoute/MainLayOutes'
import Banner from '../Pages/Banner'
import BigSale from '../Pages/BigSale'
import Blog from '../Pages/Blog'
import Category from '../Pages/Category'
import Featured from '../Pages/Featured '
import HomePage from '../Pages/HomePage'

export default function Main() {
  return (
      <MainLayOutes>
      <HomePage />
      <Banner />
      <Blog />
      <Category />
      <Featured />
      <BigSale/>
    </MainLayOutes>
  )
}
