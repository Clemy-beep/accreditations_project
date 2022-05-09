import { defineStore } from "pinia";

export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: {},
    }),
    getters: {
        getState: (state) => state.user,
    },
});