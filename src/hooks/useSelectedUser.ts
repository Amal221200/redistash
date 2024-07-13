import { User } from "@/db/dummy";
import { create } from "zustand";

interface SelectedUserStore {
    selectedUser?: User | null,
    setSelectedUser: (user: User | null) => void,
}

const useSelectedUser = create<SelectedUserStore>((set) => ({
    setSelectedUser(selectedUser) {
        set({ selectedUser })
    },
}))

export default useSelectedUser