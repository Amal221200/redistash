import { messages, USERS } from '@/db/dummy'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { AnimatePresence, motion } from 'framer-motion'
import { ScrollArea } from '@/components/ui/scroll-area'

const ChatList = () => {
    const selectedUser = USERS[0]
    return (
        <ScrollArea className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden'>
            <AnimatePresence>
                {
                    messages.map((message, idx) => (
                        <motion.div key={message.id} layout initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0, }} exit={{ opacity: 0, y: 10 }} transition={{
                            opacity: {
                                duration: 0.1
                            },
                            layout: {
                                type: 'spring',
                                bounce: 0.3,
                                duration: (idx * 0.05) + 0.2
                            },
                        }} style={{ originX: 0.5, originY: 0.5 }} className={cn('flex flex-col gap-2 p-4 whitespace-pre-wrap', message.senderId === selectedUser.id ? 'items-end' : 'items-start')}>
                            <div className={cn('flex gap-3 items-center', message.senderId === selectedUser.id ? 'flex-row-reverse' : 'flex-row')}>
                                <Avatar>
                                    <AvatarImage src={selectedUser.image} alt={selectedUser.name} className='rounded-full border-2 border-white' />
                                </Avatar>
                                {
                                    message.messageType === 'text'? (
                                        <span className='max-w-xs rounded-md bg-accent p-3'>{message.content}</span>
                                    ): (
                                        <img src={message.content} alt='message image' className='h-40 rounded border object-cover p-2 md:h-52' />
                                    )
                                }
                            </div>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
        </ScrollArea>
    )
}

export default ChatList