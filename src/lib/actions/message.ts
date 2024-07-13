"use server"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import db from "../db"

export interface Message {
    content: string,
    recieverId: string,
    messageType: "text" | 'image'
}

export async function sendMessage({ content, messageType, recieverId }: Message) {
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

    return { success: true }
}