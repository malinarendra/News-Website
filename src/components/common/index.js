import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const getProperDate = (dateString) => {
  // Create a Date object from the provided date string
  const date = new Date(dateString);

  // Define an array of month names
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Extract day, month, and year from the Date object
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Convert day to ordinal (e.g., 1st, 2nd, 3rd, 4th, etc.)
  const ordinalDay = (() => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  })();

  // Format the date as "day month year" (e.g., "10th March 2023")
  const properDate = `${ordinalDay} ${months[monthIndex]} ${year}`;

  return properDate;
};

const Title = (props) => {
  return (
    <>
      <div class='mt-8 mb-12 relative flex justify-center items-center'>
        <h1 class='text-xl font-bold inline relative sm:text-2xl'>
          {props.title + " News"}
          <span class="absolute inset-x-0 -bottom-3 h-1 bg-blue-600 rounded-full"></span>
        </h1>
      </div>
    </>
  )
}

const NewsCard = (props) => {
  return (
    <>
      <a href={props.articleLink} target='_blank'>
        <div className="w-64 h-80 rounded-md border border-gray-300 mb-8 flex-shrink-0">
          <div className="flex h-40 items-center justify-center bg-red-100">
            <img loading='lazy' className="h-full w-full rounded-tl-md rounded-tr-md" src={props.imageUrl ? props.imageUrl : "/images/no_image.jpg"} alt="news-image" />
          </div>
          <div className="p-2 flex flex-col">
            <p className="mb-1 text-sm text-gray-600">{getProperDate(props.date)}</p>
            <h3 className="mb-2 cursor-pointer text-lg font-semibold">{props.title.length > 60 ? <span>{props.title.slice(0, 60)}...</span> : <span>{props.title}</span>}</h3>
            <p>{props.author ? <span>{props.author.slice(0, 20)}</span> : null}</p>
          </div>
        </div>
      </a>
    </>
  )
}

const Common = () => {
  const [data, setData] = useState(null)
  const { category } = useParams()
  const [loading, setLoading] = useState(false)
  const API_KEY = "48bc24df11274db7af7c0c4ada610f12"
  const URL = `https://newsapi.org/v2/everything?q=${category.toLocaleLowerCase()}&apiKey=${API_KEY}`

  //function to fetch data
  const getData = async () => {
    try {
      setLoading(true)
      let rawData = await axios.get(URL);
      console.log(rawData)
      setData(rawData.data.articles)
      setLoading(false)
    } catch (e) {
      console.log(e)
    }
  }

  //useEffect to call getData function
  useEffect(() => {
    getData()
  }, [category])

  return (
    <>
      <Title title={category} />
      {/* news container */}
      {
        loading === true ? <div className='flex justify-center items-center'><div className='w-8 h-8 border-2 border-l-0 border-blue-600 animate-spin rounded-full'></div></div> :
          data === null ? <h1 className='text-center text-red-600'>No news found!</h1> :
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
                {data.map((item, i) => {
                  return <NewsCard key={i} date={item.publishedAt} title={item.title} author={item.author} imageUrl={item.urlToImage} articleLink={item.url} />
                })}
              </div>
            </>
      }
    </>
  )
}

export default Common

export { getProperDate, NewsCard }
