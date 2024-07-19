import React from 'react'
import Heading from '../heading'

const Slide = () => {
  return (
    <>
      <div className='relative cursor-pointer'>
        <img className='h-56 w-full rounded-md sm:h-80 md:h-96' src="/images/dummy.jpg" alt="dummy" />
        <div className='z-10 absolute bottom-0 left-0 h-14 w-full bg-black opacity-60 rounded-bl-md rounded-br-md'>
          <p className='text-white px-2 text-justify block w-full'>Lorem ipsum dol um doum doum doum doum doum doum doum do...</p>
        </div>
      </div>
    </>
  )
}

const SlideShow = () => {
  return (
    <>
      <section className='flex flex-col'>
        <Heading title={"Top Headlines"} />
        <div>
          <Slide />
        </div>
      </section>
    </>
  )
}

export default SlideShow
