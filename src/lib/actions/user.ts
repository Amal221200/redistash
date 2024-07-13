"use server"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "../db";
import { User } from "@/db/dummy";

export async function getUsers() {

    let cursor = "0"
    let userKeys = []
    const { getUser } = await getKindeServerSession()
    const currentUser = await getUser()

    do {
        const [nextCursor, keys] = await db.scan(cursor, { match: 'user:*', type: 'hash', count: 100 })
        cursor = nextCursor
        userKeys = [...keys]
    } while (cursor !== '0')

    const pipeline = db.pipeline()
    userKeys.forEach(key => pipeline.hgetall(key))
    const results: User[] = await pipeline.exec()
    const users = results.filter(user => user.id !== currentUser?.id)

    return users
}