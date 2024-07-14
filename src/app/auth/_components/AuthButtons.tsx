import { Button } from '@/components/ui/button'
import Link from 'next/link';

const AuthButtons = () => {
  return (
    <div className='relative z-50 flex flex-1 flex-col gap-3 md:flex-row'>
      <Button className='w-full' variant={'outline'} asChild>
        <Link href="/auth/sign-up">
          Sign Up
        </Link>
      </Button>
      <Button className='w-full' asChild>
        <Link href="/auth/sign-in">
          Login
        </Link>
      </Button>
    </div>
  )
}

export default AuthButtons