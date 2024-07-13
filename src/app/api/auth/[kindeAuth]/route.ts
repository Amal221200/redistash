import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { kindeAuth: string } }) => {

    return handleAuth(req, params.kindeAuth)
};