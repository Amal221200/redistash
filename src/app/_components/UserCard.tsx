import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { User, USERS } from '@/db/dummy'
import usePreferences from '@/hooks/usePreferences'
import useSelectedUser from '@/hooks/useSelectedUser'
import { cn } from '@/lib/utils'
import { useCallback } from 'react'
import useSound from 'use-sound'

const UserCard = ({ user, isCollapsed }: { user: User, isCollapsed: boolean }) => {
    const { selectedUser, setSelectedUser } = useSelectedUser()
    const [playSound] = useSound('/sounds/mouse-click.mp3')
    const { soundEnabled } = usePreferences()

    const onSelectUser = useCallback(() => {
        if (soundEnabled) {
            playSound()
        }
        setSelectedUser(user)
    }, [soundEnabled, playSound, user, setSelectedUser])

    return (
        isCollapsed ? (
            <TooltipProvider>
                <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                        <div className="cursor-pointer" onClick={onSelectUser}>
                            <Avatar className="my-1 flex items-center justify-center" >
                                <AvatarImage src={user.image || '/user-placeholder.png'} alt={user.name} className="size-10 rounded-full border-2 border-white" />
                                <AvatarFallback>
                                    {user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span className="sr-only">{user.name}</span>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-4">
                        {user.name}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        ) : (
            <Button variant={'grey'} size={'xl'} onClick={onSelectUser} className={cn('w-full justify-start gap-4 my-1', selectedUser?.email === user.email && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink')}>
                <Avatar className="my-1 flex items-center justify-center" >
                    <AvatarImage src={user.image || '/user-placeholder.png'} alt={user.name} className="size-10" referrerPolicy="no-referrer" />
                    <AvatarFallback>
                        {user.name[0]}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p>{user.name}</p>
                </div>
            </Button>
        )
    )
}

export default UserCard