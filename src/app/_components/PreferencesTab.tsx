"use client"
import { Button } from '@/components/ui/button'
import usePreferences from '@/hooks/usePreferences'
import { MoonIcon, SunIcon, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'
import { useSound } from "use-sound"

const PreferencesTab = () => {
  const { setTheme } = useTheme()
  const { soundEnabled, setSoundEnabled } = usePreferences()
const [playMouseClick] = useSound('/sounds/mouse-click.mp3')
const [playSoundOn] = useSound('/sounds/sound-on.mp3')
const [playSoundOff] = useSound('/sounds/sound-off.mp3')
  const handleSetTheme = useCallback((theme: string) => {
    setTheme(theme)
    if(soundEnabled){
      playMouseClick()
    }
  }, [setTheme, soundEnabled, playMouseClick])

  const handleVolume = useCallback(() => {
    setSoundEnabled(!soundEnabled)
    if(soundEnabled){
      playSoundOff()
    } else {
      playSoundOn()
    }
  }, [setSoundEnabled, soundEnabled, playSoundOff, playSoundOn])

  return (
    <div className='flex flex-wrap gap-2 px-1 md:px-2'>
      <Button onClick={() => handleSetTheme('light')} variant='outline' size='icon'>
        <SunIcon className='size-[1.2rem] text-foreground' />
      </Button>
      <Button onClick={() => handleSetTheme('dark')} variant='outline' size='icon'>
        <MoonIcon className='size-[1.2rem] text-foreground' />
      </Button>
      <Button className='' variant='outline' size='icon' onClick={handleVolume}>
        {
          soundEnabled ? <Volume2Icon className='size-[1.2rem] text-foreground' /> : <VolumeXIcon className='size-[1.2rem] text-foreground' />
        }
      </Button>
    </div>
  )
}

export default PreferencesTab