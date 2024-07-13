import Image from 'next/image'
import React from 'react'
import AuthButtons from './_components/AuthButtons'

const AuthPage = () => {
  return (
    <div className='flex h-screen w-full'>
      <div className='relative flex flex-1 items-center justify-center overflow-hidden bg-[#651c2b] dark:bg-[#651c2b55]'>
        <img src="/redis-logo.svg" alt="redis-logo"
          className='pointer-events-none absolute -bottom-52 -left-1/4 scale-[2] select-none opacity-25 lg:scale-125 xl:scale-100' />
        <div className='z-[1] flex flex-col gap-2 px-4 text-center font-semibold md:text-start xl:ml-40'>
          <Image src="/logo.png" alt="logo" width={763} height={173} className='pointer-events-none mt-20 w-[420px] select-none' />
          <p className='text-balance text-2xl md:text-3xl'>
            The <span className='bg-red-500 px-2 font-bold text-white'>ULTIMATE</span> chat app
          </p>
          <p className='mb-32 text-balance text-2xl md:text-3xl'>
            You <span className='bg-green-500/90 px-2 font-bold text-white'>NEED TO</span> build
          </p>
          <AuthButtons />
        </div>
      </div>
      <div className='bg-noise relative hidden flex-1 items-center justify-center overflow-hidden md:flex'>
        <Image src={'/hero-right.png'} alt='hero image' fill className='pointer-events-none select-none object-cover opacity-90 dark:opacity-60' />
      </div>
    </div>
  )
}

export default AuthPage