import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref('');

    const setUser = (newUser: any) => {
        user.value = newUser;
    }

    const setToken = (newToken: string) => {
        token.value = newToken;
    }

    return {
        user,
        token,
        setUser,
        setToken
    }
});
