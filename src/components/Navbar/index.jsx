import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import "./index.css"

const data = [
  {
    lname: "Business",
    llink: "Business"
  },
  {
    lname: "Entertainment",
    llink: "Entertainment"
  },
  {
    lname: "Health",
    llink: "Health"
  },
  {
    lname: "Science",
    llink: "Science"
  },
  {
    lname: "Sports",
    llink: "Sports"
  },
  {
    lname: "Bitcoin",
    llink: "Bitcoin"
  },
  {
    lname: "Agriculture",
    llink: "Agriculture"
  },
  {
    lname: "Technology",
    llink: "Technology"
  },
]

const Navbar = () => {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  // search article function
  const searchResult = () => {
    if (search === "") { return null }
    else {
      navigate(`/search/${search}`)
      setSearch("")
    }
  }

  //function will run when enter will press on input field
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Call your function here
      searchResult()
    }
  };


  const [slidePosition, setSlidePosition] = useState(0);
  const totalCards = 7; // Total number of cards

  const slideToLeft = () => {
    setSlidePosition(prevPosition => prevPosition - 1);
  };

  const slideToRight = () => {
    setSlidePosition(prevPosition => prevPosition + 1);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 780) {
        setSlidePosition(0);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array to run the effect only once on component mount



  return (
    <>
      <header className='sticky top-0 z-50 bg-white'>
        <div>
          <div className='flex justify-between items-center h-20'>
            <h1 className='text-2xl font-bold sm:text-3xl'>NewsApp</h1>
            <label className='sm:hidden' for='search'><i class="fa-solid fa-magnifying-glass text-2xl  px-2 py-1 font-bold rounded-full"></i></label>
            <div className='hidden sm:flex justify-between items-center w-96 h-10'>
              <input className='h-full border border-gray-500 rounded-tl-md rounded-bl-md w-full px-3 focus:outline-0' type="search" placeholder='Search articles...' name="articleSearch" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
              <button onClick={searchResult} className='flex justify-center items-center rounded-tr-md rounded-br-md bg-blue-600 text-white px-3'><i class="fa-solid fa-magnifying-glass text-2xl  px-2 py-1 font-bold rounded-full"></i></button>
            </div>
          </div>
          <input id='search' className='peer hidden' type="checkbox" />
          <div className='hidden peer-checked:flex sm:peer-checked:hidden justify-between items-center h-10 mb-6'>
            <input className='h-full border border-gray-500 rounded-tl-md rounded-bl-md w-full px-3 focus:outline-0' type="search" placeholder='Search articles...' name="articleSearch" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyPress} />
            <button onClick={searchResult} className='flex justify-center items-center rounded-tr-md rounded-br-md bg-blue-600 text-white px-3'><i class="fa-solid fa-magnifying-glass text-2xl  px-2 py-1 font-bold rounded-full"></i></button>
          </div>
        </div>
        <div className='my-3 flex justify-between items-center overflow-hidden relative pb-4'>
          {slidePosition === 0 ? null : <>
            <div className='absolute left-0 z-40 bg-black opacity-80 text-white px-1 md:hidden' onClick={slideToLeft}>
              <i className="fa-solid fa-angle-left"></i>
            </div>
          </>}
          <ul className='w-full flex justify-start items-center *:text-lg *:mr-8 md:justify-center md:ml-0' style={{ transform: `translateX(-${slidePosition * 50}%)`, transition: 'transform 0.5s ease' }}>

            <li><NavLink className="relative" to="/">Home</NavLink></li>
            {data.map((val, i) => <li key={i} className='relative'><NavLink to={`/common/${val.llink}`}>{val.lname}</NavLink></li>)}
          </ul>
          {slidePosition === totalCards - 1 ? null : <>
            <div className='absolute right-0 z-40 bg-black opacity-80 text-white px-1 md:hidden' onClick={slideToRight}>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </>}
        </div>
      </header>
    </>
  )
}

export default Navbar
