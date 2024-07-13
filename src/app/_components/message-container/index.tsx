import { useEffect } from "react"
import ChatBottom from "./ChatBottom"
import ChatList from "./ChatList"
import ChatTopBar from "./ChatTopBar"
import useSelectedUser from "@/hooks/useSelectedUser"


const MessageContainer = () => {
  const { setSelectedUser } = useSelectedUser()
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'escape') {
        setSelectedUser(null)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopBar />
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
        <ChatList />
        <ChatBottom />
      </div>
    </div>
  )
}

export default MessageContainer