import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { NewsCard } from '../common/index.js'
import axios from 'axios'

const SearchQuery = () => {
    const { query } = useParams()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [totalResults,setTotalResults]=useState(0)

    const API_KEY = "48bc24df11274db7af7c0c4ada610f12"
    const URL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`

    //function to fetch data
    const getData = async () => {
        try {
            setLoading(true)
            let rawData = await axios.get(URL);
            console.log(rawData)
            setData(rawData.data.articles)
            setTotalResults(rawData.data.totalResults)
            setLoading(false)
        } catch (e) {
            console.log(e)
        }
    }

    //useEffect to call getData function
    useEffect(() => {
        getData()
    }, [query])

    return (
        <>
            {
                loading === true ? <div className='flex justify-center items-center'><div className='w-8 h-8 border-2 border-l-0 border-blue-600 animate-spin rounded-full'></div></div> :
                    totalResults === 0 ? <h1 className='text-center text-red-600'>No news found!</h1> :
                        <>
                            <div className='mb-12'>
                                <h1 className='text-center text-2xl'>Results for <span className='text-red-600'>"{query}"</span></h1>
                            </div>
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

export default SearchQuery
