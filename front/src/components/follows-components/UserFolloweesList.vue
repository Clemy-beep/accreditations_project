<template>
  <h1>Your followed accounts</h1>
  <span>en voir plus</span>
  <div id="followees-list" v-for="followee in followees" :key="followee.id">
    <h2>{{ followee.username }}</h2>
  </div>
</template>
<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      followees: [],
    };
  },
  computed: {
    ...mapState(userStore, {
      getUser: "user",
    }),
    currentUser() {
      return this.getUser;
    },
  },
  created() {
    this.getFollowees();
  },
  methods: {
    ...mapActions(userStore, ["fetchFollowedAccounts"]),
    getFollowees: async function () {
      this.currentUser.followedAccounts = await this.fetchFollowedAccounts(
        this.currentUser.id
      );
      this.followees = this.currentUser.followedAccounts;
    },
  },
};
</script>
