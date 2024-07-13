import ChatBottom from "./ChatBottom"
import ChatList from "./ChatList"
import ChatTopBar from "./ChatTopBar"


const MessageContainer = () => {
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