import React from 'react'
import Navbar from './Navbar'
import Content from './Content'

const Home = () => {
  return (
    <>
      <div className='w-screen h-full bg-black'>
        <Navbar/>
        <Content />
      </div>
    </>
  )
}

export default Home