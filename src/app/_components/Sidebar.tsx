import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { USERS } from "@/db/dummy"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { LogOutIcon } from "lucide-react"

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const selectedUser = USERS[0]
  return (
    <div className="group relative flex h-full max-h-full flex-col gap-4 overflow-auto bg-background p-2 data-[collapsed=true]:p-2" >
      {!isCollapsed &&
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
          </div>
        </div>
      }

      <ScrollArea className="flex flex-col gap-2 px-2 group-[[data-collapsed-true]]:justify-center group-[[data-collapsed-true]]:px-2">
        {
          USERS.map(user => (
            isCollapsed ? (
              <TooltipProvider key={user.id}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div className="cursor-pointer">
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
              <Button key={user.id} variant={'grey'} size={'xl'} className={cn('w-full justify-start gap-4 my-1', selectedUser.email === user.email && 'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink')}>
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
          ))
        }
      </ScrollArea>

      <div className="mt-auto">
        <div className="flex cursor-pointer items-center justify-between gap-2 py-2 md:px-6">
          {
            !isCollapsed && (
              <div className="flex items-center justify-center">
                <Avatar className="my-1 flex items-center justify-center" >
                  <AvatarImage src={'/user-placeholder.png'} alt={"john_doe"} className="size-8 rounded-full border-2 border-white" />
                  <AvatarFallback>
                    {"John Doe"}
                  </AvatarFallback>
                </Avatar>
                <p className="font-bold">{"John Doe"}</p>
              </div>
            )
          }
          <div className="flex">
            <LogOutIcon size={22} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar