'use client'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SmileIcon } from 'lucide-react'
import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { useTheme } from 'next-themes'

const EmojiPicker = ({ onPick }: { onPick: (val: string) => void }) => {
    const { theme } = useTheme()
    return (
        <Popover>
            <PopoverTrigger>
                <SmileIcon className='size-5 text-muted-foreground transition hover:text-foreground' />
            </PopoverTrigger>
            <PopoverContent side='top' className='w-full'>
                <Picker emojiSize={18} data={data} maxFrequentRows={1} theme={theme} onEmojiSelect={(e: any) => onPick(e.native)} />
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPicker