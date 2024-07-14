import { KeyboardEvent, LegacyRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, Loader, SendHorizontalIcon, ThumbsUpIcon } from 'lucide-react'
import EmojiPicker from './EmojiPicker'
import { Button } from '@/components/ui/button'
import useSound from 'use-sound'
import usePreferences from '@/hooks/usePreferences'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MessageArg, sendMessage } from '@/lib/actions/message'
import useSelectedUser from '@/hooks/useSelectedUser'
import UploadWidgetButton from '@/components/UploadWidgetButton'
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import Image from 'next/image'
import pusherConfig from '@/lib/pusher'
import { Message } from '@/db/dummy'
import { useUser } from '@clerk/nextjs'

const ChatBottom = () => {
  const queryClient = useQueryClient()
  const [message, setMessage] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const { selectedUser } = useSelectedUser();
  const { user: currentUser } = useUser()
  const [playSound1] = useSound('/sounds/keystroke1.mp3')
  const [playSound2] = useSound('/sounds/keystroke2.mp3')
  const [playSound3] = useSound('/sounds/keystroke3.mp3')
  const [playSound4] = useSound('/sounds/keystroke4.mp3')
  const [notificationSound] = useSound('/sounds/notification.mp3')
  const playSoundFunctions = useMemo(() => [playSound1, playSound2, playSound3, playSound4], [playSound1, playSound2, playSound3, playSound4])

  const { soundEnabled } = usePreferences()
  const inputRef = useRef<HTMLTextAreaElement>()

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['send_message', selectedUser?.id],
    mutationFn: async (message: MessageArg) => await sendMessage(message),
    async onSuccess(data, variables, context) {
      await queryClient.invalidateQueries({ queryKey: ['get_messages', selectedUser?.id] })
    },
  })

  const handleInput = useCallback((value: string) => {
    if (soundEnabled) {
      playSoundFunctions[Math.floor(Math.random() * playSoundFunctions.length)]()
    }
    setMessage(value)
    inputRef.current?.focus()
  }, [soundEnabled, playSoundFunctions])

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) {
      return
    }
    await mutateAsync({ content: message, messageType: 'text', recieverId: selectedUser?.id! })
    setMessage('')
    inputRef.current?.focus()
  }, [message, mutateAsync, selectedUser])

  const handleKeyDown = useCallback(async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      await handleSendMessage()
    }
  }, [handleSendMessage])

  const handleThumbsUp = useCallback(async () => {
    await mutateAsync({ messageType: 'text', content: '👍', recieverId: selectedUser?.id! })
  }, [mutateAsync, selectedUser]);

  const handleImageUpload = useCallback(async () => {
    await mutateAsync({ content: imgUrl, messageType: 'image', recieverId: selectedUser?.id! })
    setImgUrl('')
  }, [mutateAsync, imgUrl, selectedUser]);

  useEffect(() => {
    const channelName = [currentUser?.id, selectedUser?.id].sort().join('__')
    const channel = pusherConfig.pusherClient.subscribe(channelName)
    const handleNewMessage = (data: { message: Message }) => {
      queryClient.setQueryData(['get_messages', selectedUser?.id], (oldMessages: Message[]) => [...oldMessages, data.message])
      if (soundEnabled && data.message.senderId !== currentUser?.id) {
        notificationSound()
      }
    }

    channel.bind('newMessage', handleNewMessage)

    return () => {
      channel.unbind('newMessage', handleNewMessage)
      pusherConfig.pusherClient.unsubscribe(channelName)
    }
  }, [currentUser, selectedUser, queryClient, notificationSound, soundEnabled])
  return (
    <footer className='flex w-full items-center justify-between gap-2 border-t p-2'>
      {
        !message.trim() && (
          <UploadWidgetButton onSuccess={(val) => setImgUrl(val)}>
            <ImageIcon size={20} className='cursor-pointer text-muted-foreground' />
          </UploadWidgetButton>
        )
      }

      <Dialog open={!!imgUrl}>
        <DialogContent>
          <DialogTitle>Image Preview</DialogTitle>
          <div className='relative mx-auto flex h-96 w-full items-center justify-center'>
            <Image src={imgUrl} alt='Image Preview' fill className='object-contain' />
          </div>

          <DialogFooter>
            <Button type='submit' disabled={isPending} onClick={handleImageUpload}>
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <AnimatePresence>
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.5 }, layout: { type: 'spring', bounce: 0.15 } }} className='relative w-full'>
          <Textarea ref={inputRef as LegacyRef<HTMLTextAreaElement>} autoComplete='off' value={message} onInput={(e) => handleInput(e.currentTarget.value)} disabled={isPending} onKeyDown={handleKeyDown} placeholder='Aa' rows={1} className='flex h-9 min-h-0 w-full resize-none items-center overflow-hidden rounded-full border bg-background outline-none focus-visible:ring-offset-0' />
          <div className='absolute bottom-[4px] right-2'>
            <EmojiPicker onPick={(val) => setMessage(current => `${current} ${val}`)} />
          </div>
        </motion.div>
        {message.trim() ? (
          <Button onClick={handleSendMessage} disabled={!message.trim() || isPending} className='size-9 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:text-white' size="icon" variant="ghost">
            {
              isPending ? <Loader size={20} className='animate-spin cursor-pointer text-muted-foreground' /> : <SendHorizontalIcon size={20} className='cursor-pointer text-muted-foreground' />
            }
          </Button>
        ) : (
          <Button disabled={isPending} onClick={handleThumbsUp} className='size-9 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:text-white' size="icon" variant="ghost">
            <ThumbsUpIcon size={20} className='cursor-pointer text-muted-foreground' />
          </Button>
        )
        }
      </AnimatePresence>
    </footer>
  )
}

export default ChatBottom