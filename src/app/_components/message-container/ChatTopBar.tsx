import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { USERS } from '@/db/dummy'
import { InfoIcon, XIcon } from 'lucide-react'
import React from 'react'

const ChatTopBar = () => {
    const selectedUser = USERS[0]
    
    return (
        <header className='flex h-20 w-full items-center justify-between border-b p-4'>
            <div className='flex items-center gap-2'>
                <Avatar>
                    <AvatarImage src={selectedUser.image || '/user-placeholder.png'} alt={selectedUser.name} className='size-10 object-cover' />
                    <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                </Avatar>
                <span className='font-medium'>{selectedUser.name}</span>
            </div>

            <div className='flex gap-2'>
                <InfoIcon className='cursor-pointer text-muted-foreground hover:text-primary' />
                <XIcon className='cursor-pointer text-muted-foreground hover:text-primary' />
            </div>
        </header>
    )
}

export default ChatTopBar