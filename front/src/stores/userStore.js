/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";

export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: {},
    }),

    actions: {
        fetchAvatar: async function(userId) {
            if (userId) {
                return fetch(`http://localhost:3000/api/user/${userId}/avatar`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    })
                    .then((r) => r.blob())
                    .then(function(image) {
                        return URL.createObjectURL(image);
                    });
            } else console.log("no user id");
        },
        fetchUser: async function() {},
    },
    persist: true,
});