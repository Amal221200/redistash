import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useQuery } from '@tanstack/react-query'
import useSelectedUser from '@/hooks/useSelectedUser'
import { getMessages } from '@/lib/actions/message'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { LegacyRef, useEffect, useRef } from 'react'
import ChatSkeleton from '../ChatSkeleton'

const ChatList = () => {
    const { selectedUser } = useSelectedUser()
    const chatListRef = useRef<HTMLDivElement>()
    const { user, isLoading: isUserLoading } = useKindeBrowserClient()
    const { data: messages, isLoading: isChatLoading } = useQuery({
        queryKey: ['get_messages', selectedUser?.id],
        queryFn: async () => await getMessages(selectedUser?.id!),
        enabled: !!selectedUser && !!user && !isUserLoading
    })

    useEffect(() => {
        if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight
        }
    }, [messages])
    return (
        <div ref={chatListRef as LegacyRef<HTMLDivElement>} className='scrollbar flex h-full w-full flex-col overflow-y-auto overflow-x-hidden'>
            <AnimatePresence>
                {
                    isChatLoading ? <ChatSkeleton /> :
                        messages?.map((message, idx) => (
                            <motion.div key={message.id} layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0, }} exit={{ opacity: 0, y: 10 }} transition={{
                                opacity: {
                                    duration: 0.1
                                },
                                layout: {
                                    type: 'spring',
                                    bounce: 0.3,
                                    duration: (idx * 0.05) + 0.2
                                },
                            }} style={{ originX: 0.5, originY: 0.5 }} className={cn('flex flex-col gap-2 p-4 whitespace-pre-wrap', message.senderId === selectedUser?.id ? 'items-start' : 'items-end')}>
                                <div className={cn('flex gap-3 items-center', message.senderId === selectedUser?.id ? 'flex-row' : 'flex-row-reverse')}>
                                    <Avatar>
                                        <AvatarImage src={(message.senderId === selectedUser?.id ? selectedUser?.image : user?.picture) || '/user-placeholder.png'} alt={(message.senderId === selectedUser?.id ? selectedUser?.name : user?.given_name) || ''} className='rounded-full border-2 border-white' />
                                    </Avatar>
                                    {
                                        message.messageType === 'text' ? (
                                            <span className='max-w-xs rounded-md bg-accent p-3'>{message.content}</span>
                                        ) : (
                                            <img src={message.content} alt='message image' className='h-40 rounded border object-cover p-2 md:h-52' />
                                        )
                                    }
                                </div>
                            </motion.div>
                        ))
                }
            </AnimatePresence>
        </div>
    )
}

export default ChatList