import React from 'react'

const DottedBg = () => {
    return (
        <div
            className='absolute top-0 z-[-2] h-screen w-screen bg-[#ffffff] bg-[radial-gradient(#00000033_1px,#ffffff_1px)] bg-[size:20px_20px] dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px]'
            aria-hidden='true'
        />
    )
}

export default DottedBg