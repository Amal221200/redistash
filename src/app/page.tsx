import { cookies } from "next/headers";
import DottedBg from "./_components/DottedBg";
import PreferencesTab from "./_components/PreferencesTab";
import dynamic from "next/dynamic";
import ChatLayout from "./_components/ChatLayout";

// const ChatLayout = dynamic(() => import("./_components/ChatLayout"), { ssr: true });

export default function Home() {
  const layout = cookies().get('react-resizable-panels:layout')
  const collapsed = cookies().get('react-resizable-panels:collapse')
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-4 p-4 py-32 md:px-24">
      <PreferencesTab />

      <DottedBg />

      <div className="z-10 min-h-[85vh] w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} defaultCollapsed={defaultCollapsed} />
      </div>
    </main>
  );
}
