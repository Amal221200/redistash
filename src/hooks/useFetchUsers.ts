import { getUsers } from "@/lib/actions/user";
import { useQuery } from "@tanstack/react-query";

export default function useFetchUsers() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: async () => await getUsers(),
    })

    return {
        users: data,
        isLoading,
        isError,
    }
}