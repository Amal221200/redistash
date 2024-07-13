import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async (req, { params }) => {

    return handleAuth(req, params.kindeAuth)
};