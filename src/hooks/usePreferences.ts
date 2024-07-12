import { create } from "zustand"

interface usePreferencesStore {
    soundEnabled: boolean,
    setSoundEnabled: (soundEnabled: boolean) => void
}

const usePreferences = create<usePreferencesStore>((set) => ({
    soundEnabled: true,
    setSoundEnabled(soundEnabled: boolean) {
        set({ soundEnabled })
    }
}))

export default usePreferences