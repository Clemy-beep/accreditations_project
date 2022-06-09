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
    this.followees = this.currentUser.followedAccounts;
  },
  methods: {
    ...mapActions(userStore, ["fetchFollowedAccounts"]),
    getFollowees: async function () {
      await this.fetchFollowedAccounts(this.currentUser.id);
    },
  },
};
</script>
