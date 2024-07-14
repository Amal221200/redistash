"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import UserCard from "./UserCard"
import useFetchUsers from "@/hooks/useFetchUsers"
import { UserButton, useUser } from "@clerk/nextjs"
import UserSkeleton from "./UserSkeleton"

interface SidebarProps {
  isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const { user, isLoaded } = useUser()
  const { users, isLoading } = useFetchUsers()
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
          isLoading ? <UserSkeleton isCollapsed={isCollapsed} /> :
            users?.map(user => (
              <UserCard key={user.id} user={user} isCollapsed={isCollapsed} />
            ))
        }
      </ScrollArea>

      <div className="mt-auto">
        <div className="flex cursor-pointer items-center justify-end gap-2 py-2 md:px-6">
          {
            (!isCollapsed && isLoaded) &&
            <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
          }
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar