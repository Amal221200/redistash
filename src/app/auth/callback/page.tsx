"use client";
import { LoaderIcon } from "lucide-react"
import { useQuery } from '@tanstack/react-query'
import { checkAuthStatus } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

const AuthCallbackPage = () => {
  const router = useRouter()
  const { data } = useQuery({
    queryKey: ['auth'],
    queryFn: async () => await checkAuthStatus()
  })

  if (data?.success) {
    return router.replace('/')
  }

  return (
    <div className="mt-20 flex w-full justify-center">
      <div className="flex flex-col items-center gap-2">
        <LoaderIcon className="size-10 animate-spin text-muted-foreground" />
        <h3 className="text-xl font-bold">Redirecting...</h3>
        <p>Please Wait</p>
      </div>
    </div>
  )
}

export default AuthCallbackPage