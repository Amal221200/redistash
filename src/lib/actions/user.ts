"use server"
import db from "../db";
import { User } from "@/db/dummy";
import { currentUser } from "@clerk/nextjs/server";

export async function getUsers() {

    let cursor = "0"
    let userKeys = []
    const clerkUser = await currentUser()

    do {
        const [nextCursor, keys] = await db.scan(cursor, { match: 'user:*', type: 'hash', count: 100 })
        cursor = nextCursor
        userKeys = [...keys]
    } while (cursor !== '0')

    const pipeline = db.pipeline()
    userKeys.forEach(key => pipeline.hgetall(key))
    const results: User[] = await pipeline.exec()
    const users = results.filter(user => user.id !== clerkUser?.id)

    return users
}