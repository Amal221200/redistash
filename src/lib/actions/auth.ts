"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import db from "../db"
import { User } from "@/db/dummy"

export async function checkAuthStatus() {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    if (!user) return { success: false }

    const userId = `user:${user.id}`

    const userExists = await db.hgetall(userId)

    if (!userExists || Object.keys(userExists).length === 0) {
        const imgIsNull = user.picture?.includes('gravatar')
        await db.hset(userId, {
            id: user.id,
            email: user.email,
            name: `${user.given_name} ${user.family_name}`,
            image: imgIsNull ? '' : user.picture
        })

        return { success: true }
    }

    return { success: true }
}

export async function getCurrentUser() {
    const { getUser, isAuthenticated } = getKindeServerSession()
    const currentUser = await getUser()
    const authenticated = await isAuthenticated()
    const user = await db.hgetall(`user:${currentUser?.id}`) as unknown as User | null
    return { user, authenticated }
} 