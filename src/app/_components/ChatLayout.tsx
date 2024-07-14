"use client"
import { ResizablePanelGroup, ResizableHandle, ResizablePanel } from '@/components/ui/resizable'
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';
import MessageContainer from './message-container';
import useSelectedUser from '@/hooks/useSelectedUser';

interface ChatLayoutProps {
    defaultLayout: number[] | undefined,
    defaultCollapsed: boolean | undefined,
}
const ChatLayout = ({ defaultLayout = [320, 480], defaultCollapsed }: ChatLayoutProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { selectedUser } = useSelectedUser()

    useEffect(() => {
        const chechScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        chechScreenWidth()
        window.addEventListener('resize', chechScreenWidth)

        return () => {
            window.removeEventListener('resize', chechScreenWidth)
        }
    }, [])

    return (
        <ResizablePanelGroup direction='horizontal' className='h-full items-stretch rounded-lg bg-background' onLayout={(sizes) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)};`
        }}>
            <ResizablePanel defaultSize={defaultLayout[0]} collapsedSize={8} collapsible minSize={isMobile ? 0 : 24} maxSize={isMobile ? 8 : 30} onCollapse={() => {
                setIsCollapsed(true)
                document.cookie = `react-resizable-panels:collapsed=true;`
            }} onExpand={() => {
                setIsCollapsed(false)
                document.cookie = `react-resizable-panels:collapsed=false;`
            }} className={cn('transition-all duration-300 ease-in-out', isCollapsed && 'min-w-[80px]')}>
                <Sidebar isCollapsed={isCollapsed} isMobile={isMobile} />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30} >
                {
                    selectedUser ?
                        <MessageContainer key={selectedUser.id} /> :
                        <div className='flex h-full w-full items-center justify-center px-10'>
                            <div className='flex flex-col items-center justify-center gap-4'>
                                <img src="/logo.png" alt="logo" className='lg:1/2 w-full md:w-2/3' />
                                <p className='text-center text-muted-foreground'>Click on a chat to view the messages</p>
                            </div>
                        </div>
                }
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default ChatLayout