import { Button } from '@/components/ui/button'
import React from 'react'

const AuthButtons = () => {
  return (
    <div className='relative z-50 flex flex-1 flex-col gap-3 md:flex-row'>
        <Button className='w-full' variant={'outline'}>
            Sign Up
        </Button>
        <Button className='w-full'>
            Login
        </Button>
    </div>
  )
}

export default AuthButtons