import { LegacyRef, useCallback, useMemo, useRef, useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { AnimatePresence, motion } from 'framer-motion'
import { ImageIcon, SendHorizontalIcon, ThumbsUpIcon } from 'lucide-react'
import EmojiPicker from './EmojiPicker'
import { Button } from '@/components/ui/button'
import useSound from 'use-sound'
import usePreferences from '@/hooks/usePreferences'

const ChatBottom = () => {
  const [message, setMessage] = useState('');
  const [playSound1] = useSound('/sounds/keystroke1.mp3')
  const [playSound2] = useSound('/sounds/keystroke2.mp3')
  const [playSound3] = useSound('/sounds/keystroke3.mp3')
  const [playSound4] = useSound('/sounds/keystroke4.mp3')
  const playSoundFunctions = useMemo(() => [playSound1, playSound2, playSound3, playSound4], [playSound1, playSound2, playSound3, playSound4])
  
  const { soundEnabled } = usePreferences()
  const inputRef = useRef<HTMLTextAreaElement>()

  const handleInput = useCallback((value: string) => {
    if (soundEnabled) {
      playSoundFunctions[Math.floor(Math.random()* playSoundFunctions.length)]()
    }
    setMessage(value)
    inputRef.current?.focus()
  }, [soundEnabled, playSoundFunctions])
  return (
    <footer className='flex w-full items-center justify-between gap-2 border-t p-2'>
      {!message.trim() && <ImageIcon size={20} className='cursor-pointer text-muted-foreground' />}
      <AnimatePresence>
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 0.5 }, layout: { type: 'spring', bounce: 0.15 } }} className='relative w-full'>
          <Textarea ref={inputRef as LegacyRef<HTMLTextAreaElement>} autoComplete='off' value={message} onInput={(e) => handleInput(e.currentTarget.value)} placeholder='Aa' rows={1} className='flex h-9 min-h-0 w-full resize-none items-center overflow-hidden rounded-full border bg-background outline-none focus-visible:ring-offset-0' />
          <div className='absolute bottom-[4px] right-2'>
            <EmojiPicker onPick={(val) => setMessage(current => `${current} ${val}`)} />
          </div>
        </motion.div>
        {message.trim() ? (
          <Button className='size-9 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:text-white' size="icon" variant="ghost">
            <SendHorizontalIcon size={20} className='cursor-pointer text-muted-foreground' />
          </Button>
        ) : (
          <Button className='size-9 shrink-0 dark:bg-muted dark:text-muted-foreground dark:hover:text-white' size="icon" variant="ghost">
            <ThumbsUpIcon size={20} className='cursor-pointer text-muted-foreground' />
          </Button>
        )
        }
      </AnimatePresence>
    </footer>
  )
}

export default ChatBottom