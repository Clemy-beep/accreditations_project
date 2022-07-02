/* eslint-disable prettier/prettier */
import { defineStore } from "pinia";

export const userStore = defineStore({
    id: "user",
    state: () => ({
        user: {},
        followers: [],
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
                        // eslint-disable-next-line no-unused-vars
                        return new Promise((resolve, _) => {
                            const reader = new FileReader();
                            reader.onloadend = () => resolve(reader.result);
                            reader.readAsDataURL(image);
                        });
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
        fetchFollowedAccounts: async function(userId) {
            if (this.user.followees) return;
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
            console.log(res);

            this.user.followees = res.users;
            this.fetchFolloweesAvatars();
        },
        fetchFolloweesAvatars: async function() {
            await this.user.followees.forEach((followee) => {
                this.fetchAvatar(followee.id).then((avatar) => {
                    followee.avatar = avatar;
                });
            });
        },
    },
});