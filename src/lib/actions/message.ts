"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import db from "../db"
import { Message } from "@/db/dummy"
import pusherConfig from '../pusher'

export interface MessageArg {
    content: string,
    recieverId: string,
    messageType: "text" | 'image'
}

export async function sendMessage({ content, messageType, recieverId }: MessageArg) {
    const { getUser, isAuthenticated } = getKindeServerSession()

    if (!(await isAuthenticated())) {
        return { success: false, message: "User Not Authenticated" }
    }

    const user = await getUser()

    const senderId = user?.id

    const conversationId = `conversation:${[senderId, recieverId].sort().join(':')}`;
    const conversationExists = await db.exists(conversationId);
    if (!conversationExists) {
        await db.hset(conversationId, {
            participant1: senderId,
            participant2: recieverId,
        })

        await db.sadd(`user:${senderId}:conversations`, conversationId)
        await db.sadd(`user:${recieverId}:conversations`, conversationId)
    }

    const messageId = `message:${Date.now()}:${Math.random().toString(36).slice(2, 9)}`
    const timestamp = Date.now()
    await db.hset(messageId, {
        senderId,
        content,
        timestamp,
        messageType
    })

    await db.zadd(`${conversationId}:messages`, { score: timestamp, member: JSON.stringify(messageId) })
    const channelName = [senderId, recieverId].sort().join('__')
    await pusherConfig.pusherServer.trigger(channelName, 'newMessage', {
        message: {
            senderId,
            content,
            timestamp,
            messageType
        }
    })
    return { success: true }
}

export async function getMessages(selectedUserId: string) {
    const { getUser, isAuthenticated } = getKindeServerSession()

    if (!(await isAuthenticated())) {
        throw new Error('User not Authenticated')
    }

    const user = await getUser()

    const currentUserId = user?.id

    const conversationId = `conversation:${[selectedUserId, currentUserId].sort().join(':')}`;

    const messageIds = await db.zrange<string[]>(`${conversationId}:messages`, 0, -1)

    if (messageIds.length === 0) return []

    const pipeline = db.pipeline()
    messageIds.forEach(messageId => pipeline.hgetall(messageId))

    const messages = await pipeline.exec<Message[]>()

    return messages
}