import PusherServer from "pusher"
import PusherClient from "pusher-js"

declare global {
    var pusherClient: PusherClient | undefined;
    var pusherServer: PusherServer | undefined;
}

const pusherServer = globalThis.pusherServer || new PusherServer({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_APP_KEY!,
    secret: process.env.PUSHER_APP_SECRET!,
    cluster: 'ap2',
    useTLS: true
})

const pusherClient = globalThis.pusherClient || new PusherClient(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
    cluster: 'ap2',
})

if (process.env.NODE_ENV !== 'production') {
    globalThis.pusherClient = pusherClient;
    globalThis.pusherServer = pusherServer;
}

const pusherConfig = {
    pusherClient,
    pusherServer
}

export default pusherConfig