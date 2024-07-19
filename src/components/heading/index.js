import React from 'react'

const Heading = (props) => {
    return (
        <>
            <div class='mt-8 mb-12 relative block'>
                <h1 class='text-xl font-bold relative sm:text-2xl inline-block'>
                        {props.title}
                    <span class="absolute inset-x-0 -bottom-3 h-1 bg-blue-600 rounded-full"></span>
                </h1>
            </div>
        </>
    )
}

export default Heading
