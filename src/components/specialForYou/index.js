import React, { useState, useEffect } from 'react'
import Heading from '../heading'
import { getProperDate } from '../common'
import axios from 'axios'


// card component
const Card = (props) => {

    return (
        <>
            <a href={props.url} target='_blank'>
                <div className=" h-80 w-64 shrink-0 rounded-md border border-gray-300">
                    <div className="flex h-40 items-center justify-center bg-red-100">
                        <img className="h-full w-full rounded-tl-md rounded-tr-md" src={props.imageUrl ? props.imageUrl : "/images/dummy.jpg"} alt="news-image" />
                    </div>
                    <div className="p-2">
                        <p className="mb-1 text-sm text-gray-600">{getProperDate(props.date)}</p>
                        <h3 className="mb-2 cursor-pointer text-lg font-semibold">{props.title.length > 60 ? <span>{props.title.slice(0, 60)}...</span> : <span>{props.title}</span>}</h3>
                        <p>{props.author.length > 30 ? <span>{props.author.slice(0, 29)}</span> : <span>{props.author}</span>}</p>
                    </div>
                </div>
            </a>
        </>
    )
}

const SpecialForYou = () => {
    const [data, setData] = useState(null)
    const API_KEY = "48bc24df11274db7af7c0c4ada610f12"
    const URL = `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${API_KEY}`

    const getData = async () => {
        let rawData = await axios.get(URL);
        console.log(" hello")
        console.log(rawData)
        console.log(" hello")
        setData(rawData.data.articles)
    }

    useEffect(() => {
        getData()
    }, [])


    const [slidePosition, setSlidePosition] = useState(0);
    const totalCards = 10; // Total number of cards

    const slideToLeft = () => {
        setSlidePosition(prevPosition => prevPosition - 1);
    };

    const slideToRight = () => {
        setSlidePosition(prevPosition => prevPosition + 1);
    };

    return (
        <>
            <Heading title={"Top Healines"} />
            {data === null ? null : <>
                <div className='flex justify-between items-center relative'>
                    {slidePosition === 0 ? null : (
                        <div className='absolute top-1/2 left-4 bg-black opacity-60 size-10 flex justify-center items-center rounded-full text-xl z-20 hover:cursor-pointer' onClick={slideToLeft}>
                            <i className="fa-solid fa-angle-left text-white"></i>
                        </div>
                    )}
                    <div className='w-full overflow-x-hidden'>
                        <div className=" w-full flex items-center gap-10" style={{ transform: `translateX(-${slidePosition * 50}%)`, transition: 'transform 0.5s ease' }}>
                            {data.map((item, i) => {
                                return <Card key={i} url={item.url} imageUrl={item.urlToImage} date={item.publishedAt} title={item.title} author={item.author} />
                            })}
                        </div>
                    </div>
                    {slidePosition === totalCards - 1 ? null : (
                        <div className='absolute top-1/2 right-4 bg-black opacity-60 size-10 flex justify-center items-center rounded-full text-xl z-20 hover:cursor-pointer' onClick={slideToRight}>
                            <i className="fa-solid fa-angle-right text-white"></i>
                        </div>
                    )}
                </div>
            </>}
        </>
    )
}

export default SpecialForYou
