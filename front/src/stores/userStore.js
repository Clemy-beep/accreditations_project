/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";

export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: {},
    }),
    persist: true,
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
        fetchUser: async function(userId) {
            if (!userId) throw new Error("User Id not provided");

            const u = await fetch(`http://localhost:3000/api/user/${userId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                })
                .then((r) => r.json())
                .catch((e) => console.log(e));

            if (!u) throw new Error("User not found");

            return u;
        },
        fetchFollowers: async function(userId) {
            if (this.user.followers && this.user.followersNum) return;
            if (!userId) throw new Error("User Id not found");
            const res = await fetch(
                    `http://localhost:3000/api/user/${userId}/followers`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((r) => r.json())
                .catch((e) => console.log(e));
            if (!res) throw new Error("Followers not found");
            this.user.followers = res.followers;
            this.user.followersNum = res.followers.length;
        },
        fetchFollowedAccounts: async function(userId) {
            if (this.user.followedAccounts) return;
            if (!userId) throw new Error("User Id not found");
            const res = await fetch(
                    `http://localhost:3000/api/user/${userId}/followed-accounts`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                )
                .then((r) => r.json())
                .catch((err) => console.error(err));
            if (!res) throw new Error("Followed accounts not found");
            this.user.followedAccounts = res.users;
        },
    },
});