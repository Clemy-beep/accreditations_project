<template>
  <div>
    <h1>
      <span class="material-symbols-outlined"> badge </span> Vos abonnements
    </h1>
    <span id="followees-list-link">en voir plus</span>
  </div>
  <div
    id="followees-list"
    v-for="followee in user.followees"
    :key="followee.id"
  >
    <h2>{{ followee.username }}</h2>
  </div>
</template>
<script>
import { userStore } from "@/stores/userStore";
import { mapActions, mapState } from "pinia";

export default {
  data() {
    return {
      user: {},
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
    this.user = this.currentUser;
  },

  methods: {
    ...mapActions(userStore, ["fetchFollowedAccounts"]),
    getFollowees: async function () {
      this.fetchFollowedAccounts(this.currentUser.id);
    },
  },
};
</script>

<style scoped>
#followees-list-link {
  font-family: Poppins, sans-serif;
  font-weight: 500;
  color: #9461ff;
}

h1 {
  display: inline;
}
</style>
