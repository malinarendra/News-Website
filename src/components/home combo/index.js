import React, { useEffect, useState } from 'react'
import Heading from '../heading'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { getProperDate } from '../common'

const Card = (props) => {
  return (
    <>
      <div className='flex relative mb-8 lg:mb-4'>
        <img className='min-w-56 h-28' src={props.imageUrl ? props.imageUrl : "/images/no_image.jpg"} alt="news-image" />
        <div className='flex flex-col pl-4'>
          <p className='mt-0'>{props.title ? props.title : ""}</p>
          <p className='absolute bottom-0'><span className='font-bold mr-4'>{props.author ? props.author.slice(0, 15) : " "}</span><span>{getProperDate(props.date)}</span></p>
        </div>
      </div>
    </>
  )
}

const HomeCombo = (props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const category = props.title
  const API_KEY = process.env.API_KEY
  const URL = `https://newsapi.org/v2/everything?q=${category.toLocaleLowerCase()}&apiKey=${API_KEY}`

  const getData = async () => {
    try {
      setLoading(true)
      let rawData = await axios.get(URL);
      // console.log(rawData)
      setData(rawData.data.articles)
      setLoading(false)
    } catch (e) {
      console.error(e)
    }

  }

  useEffect(() => {
    getData()
  }, [category])


  return (
    <>
      <Heading title={props.title + " News"} />
      {loading === true ? <div className='flex justify-center items-center'><div className='w-8 h-8 border-2 border-l-0 border-blue-600 animate-spin rounded-full'></div></div> :
        <>
          {
            data === null ? null :
              <>
                <div className='flex flex-col lg:flex-row lg:justify-center md:gap-8'>
                  {/* left */}
                  <div className='relative cursor-pointer lg:w-1/2 mb-4 lg:mb-0'>
                    <img className='h-56 w-full rounded-md sm:h-full' src={data[90].urlToImage ? data[90].urlToImage : "images/no_image.jpg"} alt="news-image" />
                    <div className='z-10 absolute bottom-0 left-0 h-14 w-full bg-black opacity-60 rounded-bl-md rounded-br-md'>
                      <p className='text-white px-2 text-justify block w-full'>{data[90].description.slice(0, 120)}...</p>
                    </div>
                  </div>
                  {/* right */}
                  <div className='lg:w-1/2'>
                    <Card imageUrl={data[11].urlToImage} title={data[11].title} author={data[11].author} date={data[11].publishedAt} />
                    <Card imageUrl={data[23].urlToImage} title={data[23].title} author={data[23].author} date={data[23].publishedAt} />
                    <Card imageUrl={data[65].urlToImage} title={data[65].title} author={data[65].author} date={data[65].publishedAt} />
                    <div className='flex justify-center items-center'>
                      <NavLink className=' text-blue-600 cursor-pointer hover:underline' to={props.plink}>Read More</NavLink>
                    </div>
                  </div>
                </div>
              </>
          }
        </>}
    </>
  )
}

export default HomeCombo
