import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


const routeMatcher = createRouteMatcher([
    "/",
])

export default clerkMiddleware((auth, req) => {
    if (routeMatcher(req)) NextResponse.redirect(`${process.env.DOMAIN}/auth`);
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};