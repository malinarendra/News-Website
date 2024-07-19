import React from 'react'
import SlideShow from '../slideshow/index.jsx'
import SpecialForYou from "../specialForYou/index"
import HomeCombo from '../home combo'

const Home = () => {
  return (
    <>
        {/* <SlideShow/> */}
        <SpecialForYou/>
        {/* business */}
        <HomeCombo title={"Business"} plink={"/common/Business"}/>
        {/* Entertainment */}
        <HomeCombo title={"Entertainment"} plink={"/common/Entertainment"}/>
        {/* Health */}
        <HomeCombo title={"Health"} plink={"/common/Health"}/>
        {/* Science */}
        <HomeCombo title={"Science"} plink={"/common/Science"}/>
        {/* Sports */}
        <HomeCombo title={"Sports"} plink={"/common/Sports"}/>
        {/*Technology*/}
        <HomeCombo title={"Technology"} plink={"/common/Technology"}/>
    </>
  )
}

export default Home
