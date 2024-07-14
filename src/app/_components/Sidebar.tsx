"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import UserCard from "./UserCard"
import useFetchUsers from "@/hooks/useFetchUsers"
import { UserButton, useUser } from "@clerk/nextjs"
import UserSkeleton from "./UserSkeleton"
import { cn } from "@/lib/utils"

interface SidebarProps {
  isCollapsed: boolean,
  isMobile: boolean,
}

const Sidebar = ({ isCollapsed, isMobile }: SidebarProps) => {
  const { user, isLoaded } = useUser()
  const { users, isLoading } = useFetchUsers()
  return (
    <div className="group relative flex h-full max-h-full flex-col gap-4 overflow-auto bg-background p-2 data-[collapsed=true]:p-2" >
      {!isCollapsed && !isMobile &&
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats {users?.length ?? ''}</p>
          </div>
        </div>
      }

      <ScrollArea className="flex flex-col gap-2 px-2 group-[[data-collapsed-true]]:justify-center group-[[data-collapsed-true]]:px-2">
        {
          isLoading ? <UserSkeleton isFull={isCollapsed || isMobile} /> :
            users?.map(user => (
              <UserCard key={user.id} user={user} isFull={isCollapsed || isMobile} />
            ))
        }
      </ScrollArea>

      <div className="mt-auto">
        <div className={cn("flex cursor-pointer items-center gap-2 py-2 md:px-6", isCollapsed || isMobile ? 'justify-center' : 'justify-end')}>
          {
            (!isCollapsed && !isMobile && isLoaded) &&
            <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
          }
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar