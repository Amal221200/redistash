"use server"
import db from "../db"
import { User } from "@/db/dummy"
import { currentUser } from "@clerk/nextjs/server"

export async function checkAuthStatus() {
    const user = await currentUser()

    if (!user) return { success: false }

    const userId = `user:${user.id}`

    const userExists = await db.hgetall(userId)

    if (!userExists || Object.keys(userExists).length === 0) {
        await db.hset(userId, {
            id: user.id,
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            image: user.imageUrl
        })

        return { success: true }
    }

    return { success: true }
}

export async function getCurrentUser() {
    const clerkUser = await currentUser()
    const user = await db.hgetall(`user:${clerkUser?.id}`) as unknown as User | null
    return user
} 