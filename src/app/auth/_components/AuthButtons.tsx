import { Button } from '@/components/ui/button'
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import React from 'react'

const AuthButtons = () => {
  return (
    <div className='relative z-50 flex flex-1 flex-col gap-3 md:flex-row'>
      <Button className='w-full' variant={'outline'} asChild>
        <RegisterLink>
          Sign Up
        </RegisterLink>
      </Button>
      <Button className='w-full' asChild>
        <LoginLink>
          Login
        </LoginLink>
      </Button>
    </div>
  )
}

export default AuthButtons